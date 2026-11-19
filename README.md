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
- **Zero-Key Free OpenStreetMap Default:** Automatically loads OpenStreetMap / Esri high-resolution street tiles out of the box with **zero watermark and no API key required**.
- **Integrated API Key Configuration:** A built-in **"Map & API Key"** settings modal allows you to paste your CARTO API key (or Mapbox token) to unlock premium CARTO Voyager or Dark Matter styles. The app automatically appends `?api_key=YOUR_KEY` to each tile query and persists it in `localStorage`.
- **5 km Geofencing:** Mathematical filtering using the **Haversine formula** (`calculateDistanceKm`) to display only buses and designated stops within the 5 km operational perimeter.
- **Visual Radar Boundary:** Styled dashed geodesic perimeter circle highlighting the user's coverage radius.

### 2. Interactive Bus Marker & Pop-up Inspection
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
  - **Lower Screen Floating Dashboard (Approximate Wait Time):**
    - Large live countdown: `Approximate Wait Time: 4 min 28 sec ETA` (ticks down dynamically).
    - Current vehicle speed in `km/h` (adjusts based on whether the bus is in heavy, moderate, or clear traffic segments).
    - Remaining distance in `km`.
    - Live trip progress bar from departure to arrival.
    - Driver quick-call and instant dispatcher chat actions.
    - Trip cancellation & route reset controls.

---

## 🛠️ Technical Architecture

```
Buser Single Page Application (index.html)
│
├── Reactive State Machine (React 18)
│   ├── appMode: 'MAP_VIEW' | 'BUS_DETAILS_MODAL' | 'STOP_SELECTION' | 'CONFIRMATION_MODAL' | 'LIVE_TRACKING'
│   ├── userLocation (GPS coordinates & fallback)
│   ├── selectedBus & selectedStop
│   ├── bookingDetails (OTP, timestamps, route)
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
