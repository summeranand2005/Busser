# Buser - Smart City Bus Booking & Real-Time Fleet Tracking

**Engineered by: Senior Software Engineer (5+ Years Experience in React, Express & JavaScript)**  
**Platform: Single-Page Application (SPA) • Front-End Only • Responsive Mobile & Desktop**

---

## 🚌 Executive Overview & Startup Problem Statement

As a startup in urban bus management, operating and coordinating multiple bus routes simultaneously across a dense city is notoriously difficult due to:
1. **Dynamic Congestion & Traffic Chokepoints:** Buses running on fixed schedules frequently get delayed by variable traffic.
2. **Passenger Uncertainty & Missed Connections:** Passengers waiting blindly at stops experience anxiety without real-time GPS visibility.
3. **Fleet Allocation Inefficiencies:** Managing demand spikes across different corridors requires on-demand booking and intelligent stop assignment.

**Buser** solves this by bridging the gap between municipal bus transit and on-demand cab-hailing UX (like Uber/Lyft), giving passengers total transparency, interactive bus inspection, guaranteed stop pickups, and live cab-style tracking.

---

## 🌟 Key Features Implemented

### 1. GPS-Connected 5 km Radar Map & Multi-Provider Tile Engine
- **Live User Geolocation:** Seamlessly integrates with the HTML5 `navigator.geolocation` API to pinpoint the user's real-time coordinates.
- **Graceful Fallback:** If location permissions are denied, it centers on a metropolitan downtown transit hub.
- **Pre-Configured CARTO Voyager API Integration:** Fully pre-configured with the CARTO API key (`cb1_5c98_1_e29b42e3a8d35e9d14a2af29`) as the default basemap, with high-buffer prefetching (`keepBuffer: 12`) and full-viewport dynamic sizing to ensure smooth, continuous tile rendering on zoom and pan with zero blank areas.
- **Multi-Provider Support:** Easily switch between CARTO Voyager, CARTO Dark, OpenStreetMap, and Esri via the in-app map settings.
- **5 km Geofencing:** Mathematical filtering using the **Haversine formula** (`calculateDistanceKm`) to display only buses and designated stops within the 5 km operational perimeter.
- **Visual Radar Boundary:** Styled dashed geodesic perimeter circle highlighting the user's coverage radius.

### 2. Interactive Bus Marker & Pop-up Inspection
- **High-Visibility Transit Bus Icon:** Custom-styled marker badge featuring a bold, dedicated circular bus icon badge (`🚌`), route designation, distance chip, and road pointer with fixed min-width dimensions to prevent flexbox shrinking on zoom or pan.
- **Tap Any Bus:** Clicking any bus marker brings up a modal window.
- **Bus Interior Photo Gallery:**
  - High-definition photography carousel highlighting executive seating, ambient LED lighting, dual climate control, USB-C fast charging ports, and overhead luggage bays.
  - Interactive next/previous buttons, dot indicators, captions, and thumbnail preview bar.
- **Current Driver Dossier:**
  - Driver portrait avatar with verified status checkmark.
  - Star ratings (e.g. `4.94 ★`) with verified review volume.
  - Driver experience (`8 Years Exp • 18,450 Safe Trips`).
  - Languages spoken & safety certifications (`Top Rated`, `Safety Champion`, `Verified Pro`).
- **Fleet Telematics & Specs:**
  - Real-time seat availability (`16 / 42 available`).
  - Distance from user in km.
  - Standard fare calculation and amenity pills (AC, CCTV, WiFi, Wheelchair ramp).
- **Book This Bus Button:** Sticky primary CTA positioned at the bottom of the scrollable pop-up.

### 3. Nearest Bus Stop Highlight & Selection Mode
- Clicking **"Book This Bus"** immediately closes the bus inspection modal.
- Map transitions into **Stop Selection Mode**:
  - Highlights all nearest bus stops with pulsing amber beacons, ping radar animations, and name/distance badges.
  - Displays top notification banner: *"Select your pickup bus stop within 5km"*.
  - Smoothly pans/fits map bounds to showcase all candidate pickup stops.
  - Allows the customer to select the exact stop they want the bus to arrive at.

### 4. Booking Confirmation with Animated Tick Mark
- Selecting a stop instantly triggers the **Confirmation Modal**.
- Features an **animated SVG circular draw and checkmark (tick mark)** with celebratory green styling.
- Features prominent text: **"Your bus has been booked and it will be arriving soon!"**
- Built-in harmonic audio confirmation using the **Web Audio API** (clean dual-oscillator acoustic chime).
- Complete digital receipt:
  - Assigned Bus Model & License Plate
  - Route Code
  - Designated Pickup Stop Name & Walk Distance
  - Boarding OTP code
  - Driver Name

### 5. Cab-Style Live Bus Tracking
- Closing the confirmation modal launches the **Real-Time Live Tracking Mode**:
  - **Animated Bus Marker:** Moving dynamically along the street route towards the passenger's chosen pickup stop.
  - **Traffic-Highlighted Route Segments:** Road route polyline split into traffic conditions:
    - 🟢 **Green:** Smooth / Clear Flow
    - 🟡 **Amber:** Moderate Traffic
    - 🔴 **Red:** Heavy Traffic / Congestion Chokepoint
  - **Active Road Corridor Display:** Live corridor badge displaying the exact street (e.g. *Outer Ring Road (Sector 4 Express Corridor)*) the bus is currently navigating.
  - **Collapsible & Scrollable Live Tracking Drawer (Full Map Visibility):**
    - **Swipe / Scroll Down to Collapse:** Swipe down on mobile, scroll down on the drawer, or tap **`▼ Scroll Down / View Map`** to collapse the drawer into a sleek, minimal bottom bar (~68px). Leaves **over 90% of the map completely unobstructed** so passengers can view the entire animated bus route clearly.
    - **Compact Live Bar Indicators:** Even when collapsed, passengers can continuously track:
      - Circular bus route badge (e.g. `101`)
      - Live countdown: `Approximate Wait Time / ETA` (e.g. `2 min 06 sec ETA`)
      - Live Speed (`31 km/h`) & active road corridor
      - 1-tap **`▲ Expand Details`** button
    - **Swipe / Scroll Up to Expand:** Swipe up, scroll up with the mouse wheel, or tap anywhere on the compact bar to restore the full dashboard with driver profile, progress bar, and trip actions.
    - **Automatic Camera Re-centering:** Automatically re-fits Leaflet map bounds when toggled so the bus and destination are framed in the visible viewport.
    - **Large Live Countdown:** `Approximate Wait Time: 4 min 28 sec ETA` (ticks down dynamically).
    - **Current Vehicle Speed:** in `km/h` (adjusts based on whether the bus is in heavy, moderate, or clear traffic segments).
    - **Remaining Distance:** in `km` to the picked bus stop.
    - **Live Trip Progress Bar:** from departure to stop arrival.
    - **Driver Quick Actions:** Instant call and dispatcher chat triggers.
    - **Trip Controls:** Cancel booking and route reset buttons.

---

### 6. Tabular External Database (`DATABASE.md` & `database.json`)
- **Native GitHub Tabular Format:** Maintained in a separate, isolated markdown file (`DATABASE.md`) with clean GFM tables viewable directly on the GitHub website.
- **Trip Records Schema:** Stores all 8 mandatory transit parameters:
  1. `Unique User ID`: 10-character alphanumeric ID (e.g. `A7X9K2P4Q1`).
  2. `Bus Number`: Designated route code (e.g. `101-EXPRESS`, `204-AIRPORT`).
  3. `Bus Driver`: Assigned captain name (e.g. `Captain Rajesh Sharma`).
  4. `Distance (User to Bus)`: Geodesic distance in km.
  5. `Distance (User to Bus Stop)`: Geodesic distance in km to the chosen pickup stop.
  6. `Picked Bus Stop Name`: Official stop shelter name.
  7. `Estimated Time of Arrival (ETA)`: Arrival wait calculation.
  8. `Current Route (Road Name)`: Active street corridor (e.g. `Airport Link Highway (NH-44)`).
- **In-App Database Inspector:** 1-click database modal allowing the user to view live bookings, inspect registered commuters, copy the markdown table to clipboard, or download an updated `DATABASE.md` directly.

---

### 7. Passenger Authentication & Account Management
- **Automatic Interception on Booking:** If an unauthenticated user attempts to book a bus, the booking flow seamlessly intercepts and opens the Sign Up modal while preserving their selected bus.
- **3-Box Sign Up Pop-Up:**
  - `Username`: Chosen profile handle.
  - `Email ID`: Verified email address for receipts.
  - `Password`: Account password.
  - **"Sign Up" Button:** Generates a unique 10-digit alphanumeric User ID (e.g. `A7X9K2P4Q1`), registers the user in the tabular database, signs the user in, and places them directly back into the bus booking pop-up.
  - **"Log In" Option:** Navigates directly to the Log In pop-up.
- **2-Box Log In Pop-Up:**
  - `Email ID / Username / User ID`: Accepts any of the three identifiers.
  - `Password`: Account password.
  - **"Log In" Button:** Validates credentials against the database. If correct, authenticates and returns user to the bus booking modal; if invalid, displays an error asking the user to re-enter their details.
  - **Quick Test Autofill:** Includes pre-configured demo account credentials for immediate testing.
- **Top-Right Header Profile Indicator:**
  - **When NOT Signed In:** Blank outline profile silhouette, displays `ID: GUEST-USER`, and reads `"sign up here"` below. Clicking opens the Sign Up pop-up.
  - **When SIGNED IN:** Passenger's profile avatar, username next to it, 10-digit alphanumeric User ID chip, and `"signed in"` in small text below. Clicking opens the account/sign-in pop-up.

---

## 🛠️ Technical Architecture

```
Buser Single Page Application (index.html)
│
├── Reactive State Machine (React 18)
│   ├── appMode: 'MAP_VIEW' | 'BUS_DETAILS_MODAL' | 'STOP_SELECTION' | 'CONFIRMATION_MODAL' | 'LIVE_TRACKING'
│   ├── authModalMode: null | 'SIGN_UP' | 'LOG_IN'
│   ├── currentUser (userId: 10-digit alphanumeric, username, email)
│   ├── usersDb & bookingsDb (localStorage synced + DATABASE.md exporter)
│   ├── userLocation (GPS coordinates & fallback)
│   ├── selectedBus & selectedStop
│   ├── bookingDetails (OTP, timestamps, active corridor road name)
│   └── liveTrackingEngine (interpolated coordinates, speed, traffic segment analysis)
│
├── Geospatial Engine (Leaflet 1.9.4 & CartoDB Voyager)
│   ├── User Marker (pulsing GPS indicator)
│   ├── Dynamic 5 km Geodesic Radius Circle
│   ├── Bus Markers & Stop Markers with custom DOM SVGs
│   ├── Route Spline Interpolation with Traffic Color Encoding (Emerald, Amber, Rose)
│   └── Real-time Heading & Position Updating
│
└── Design System (Tailwind CSS 3.4 & Google Fonts Outfit/Inter)
    ├── Dark modern glassmorphism (slate-950, slate-900/90 backdrop-blur)
    ├── Touch-first mobile responsiveness and desktop support
    └── Micro-interactions (radar ping, drawCheck SVG keyframes, smooth easing)
```

---

## 🚀 How to Run & View the Application

1. Open File Explorer to:
   ```
   c:\Users\summe\Documents\Buser
   ```
2. Double-click **`index.html`** to open it directly in any modern browser (Google Chrome, Microsoft Edge, Opera GX, Brave, Firefox, Safari).
3. Allow location access when prompted to see buses and stops near your actual physical location, or explore the pre-configured metropolitan transit grid!
