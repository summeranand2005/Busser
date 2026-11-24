const GITHUB_API = 'https://api.github.com';
const DATABASE_PATH = 'database.json';
const MARKDOWN_PATH = 'DATABASE.md';

function getConfig() {
  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH = 'main' } = process.env;
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    throw new Error('GitHub storage is not configured. Set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO in Vercel.');
  }
  return { token: GITHUB_TOKEN, owner: GITHUB_OWNER, repo: GITHUB_REPO, branch: GITHUB_BRANCH };
}

async function githubRequest(config, path, options = {}) {
  const response = await fetch(`${GITHUB_API}/repos/${config.owner}/${config.repo}/contents/${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${config.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(result.message || `GitHub request failed (${response.status}).`);
    error.status = response.status;
    throw error;
  }
  return result;
}

async function readFile(config, path) {
  const file = await githubRequest(config, `${path}?ref=${encodeURIComponent(config.branch)}`);
  return {
    sha: file.sha,
    text: Buffer.from(file.content, 'base64').toString('utf8'),
  };
}

async function writeFile(config, path, content, sha, message) {
  return githubRequest(config, path, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: Buffer.from(content, 'utf8').toString('base64'),
      sha,
      branch: config.branch,
    }),
  });
}

function updateUsersTable(markdown, users) {
  const heading = '### 👥 Registered Users Master Database';
  const start = markdown.indexOf(heading);
  if (start < 0) return markdown;
  const tableStart = markdown.indexOf('| Unique User ID', start);
  const tableEnd = markdown.indexOf('\n\n', tableStart);
  if (tableStart < 0 || tableEnd < 0) return markdown;

  const rows = users.map((user) =>
    `| **\`${user.userId}\`** | \`${user.username}\` | \`${user.email}\` | ${user.createdAt} | ${user.role || 'Verified Commuter'} |`
  );
  const table = [
    '| Unique User ID (10-Digit Alphanumeric) | Username | Registered Email | Account Created | Security Role |',
    '| :--- | :--- | :--- | :--- | :--- |',
    ...rows,
  ].join('\n');
  return `${markdown.slice(0, tableStart)}${table}${markdown.slice(tableEnd)}`;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  if (req.method === 'GET') {
    try {
      const config = getConfig();
      const databaseFile = await readFile(config, DATABASE_PATH);
      const database = JSON.parse(databaseFile.text);
      return res.status(200).json({ users: Array.isArray(database.users) ? database.users : [] });
    } catch (error) {
      console.error('Could not load registered users:', error.message);
      return res.status(500).json({ error: 'Could not load registered users.' });
    }
  }

  const { username, email, password, userId, createdAt, avatar, role } = req.body || {};
  if (typeof username !== 'string' || !username.trim() ||
      typeof email !== 'string' || !email.includes('@') ||
      typeof password !== 'string' || password.length < 4 ||
      typeof userId !== 'string' || !/^[A-Z0-9]{10}$/.test(userId)) {
    return res.status(400).json({ error: 'Please provide valid registration details.' });
  }

  try {
    const config = getConfig();
    const databaseFile = await readFile(config, DATABASE_PATH);
    const database = JSON.parse(databaseFile.text);
    database.users = Array.isArray(database.users) ? database.users : [];

    const duplicate = database.users.some((user) =>
      user.username.toLowerCase() === username.trim().toLowerCase() ||
      user.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (duplicate) return res.status(409).json({ error: 'An account with this username or email already exists. Please log in.' });

    const newUser = {
      userId,
      username: username.trim(),
      email: email.trim(),
      password,
      ...(avatar ? { avatar } : {}),
      createdAt: createdAt || new Date().toISOString().slice(0, 10),
      role: role || 'Verified Commuter',
    };
    database.users.unshift(newUser);
    database.lastSynced = new Date().toISOString();

    await writeFile(config, DATABASE_PATH, `${JSON.stringify(database, null, 2)}\n`, databaseFile.sha, `Register ${newUser.username}`);

    try {
      const markdownFile = await readFile(config, MARKDOWN_PATH);
      const updatedMarkdown = updateUsersTable(markdownFile.text, database.users);
      if (updatedMarkdown !== markdownFile.text) {
        await writeFile(config, MARKDOWN_PATH, updatedMarkdown, markdownFile.sha, `Update registered users table`);
      }
    } catch (markdownError) {
      // database.json is the source of truth; a missing markdown mirror must not undo signup.
      console.error('Could not update DATABASE.md:', markdownError.message);
    }

    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error('Registration persistence failed:', error.message);
    const status = error.status === 409 ? 409 : 500;
    return res.status(status).json({ error: 'Registration could not be saved to the database. Please try again.' });
  }
};
