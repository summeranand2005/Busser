# 🗄️ Buser Fleet Management - Passenger Bookings Database

> **Confidential Transit Logs • Tabular Passenger Records**  
> This file serves as the external database for passenger trip reservations, real-time telematic distances, and active street corridors across the city transit grid. Viewable natively as a table on the GitHub website.

---

### 📋 Live Bookings Database Table

| Booking ID | Unique User ID (10-Digit Alphanumeric) | Bus Number | Bus Driver | Distance (User to Bus) | Distance (User to Bus Stop) | Picked Bus Stop Name | Estimated Time of Arrival (ETA) | Current Route (Road Name) | Booked At | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `BSR-849201` | **`A7X9K2P4Q1`** | 101-EXPRESS | Captain Rajesh Sharma | 2.1 km | 0.8 km | Central Station Bus Bay A | 6 mins | Outer Ring Road (Sector 4 Express Corridor) | 2026-11-22 14:15 | Completed |
| `BSR-612940` | **`M3B8T5W1Z9`** | 204-AIRPORT | Suresh Patil | 2.3 km | 1.1 km | Town Hall Plaza Crossing | 8 mins | Airport Link Highway (NH-44) | 2026-11-22 15:40 | Completed |
| `BSR-395172` | **`K9P2X4M7B1`** | 305-TECHLOOP | Anand R. Verma | 2.7 km | 0.6 km | Tech Park South Campus | 7 mins | Cyberlink Tech Corridor | 2026-11-22 16:02 | Completed |
| `BSR-721483` | **`D4N8W1Q6Z2`** | 412-RINGROAD | Pooja Krishnan | 2.6 km | 0.9 km | Metro Terminal West Gate | 6 mins | Kengeri Satellite Link Road | 2026-11-22 16:18 | Completed |
| `BSR-550391` | **`H2T7L9C3Y5`** | 520-CENTRAL | Mohammad Tariq | 3.1 km | 1.4 km | Victoria Hospital Junction | 10 mins | Grand Central Boulevard | 2026-11-22 16:22 | Active |

---

### 👥 Registered Users Master Database

| Unique User ID (10-Digit Alphanumeric) | Username | Registered Email | Account Created | Security Role |
| :--- | :--- | :--- | :--- | :--- |
| **`P6UWRUYC9B`** | `Sanath K S` | `sanathkumar5638@gmail.com` | 2026-11-27 | Verified Commuter |
| **`2VIQQSMF58`** | `Kyle butler` | `butler1208@gmail.com` | 2026-11-25 | Verified Commuter |
| **`V0QLXMVK89`** | `Vidit` | `vid@email.com` | 2026-11-25 | Verified Commuter |
| **`QXWEZB9VPI`** | `Manu` | `rohithmk87@gmail.com` | 2026-11-25 | Verified Commuter |
| **`WU8I5NZHX5`** | `Sudhamshu.rao` | `sudhukaranth.2009@gmail.com` | 2026-11-25 | Verified Commuter |
| **`2D4VVGR1L4`** | `krushna` | `summeranand2005@gmail.com` | 2026-11-24 | Verified Commuter |
| **`A7X9K2P4Q1`** | `rohit_sharma` | `rohit@example.com` | 2026-11-20 | Verified Commuter |
| **`M3B8T5W1Z9`** | `priya_nair` | `priya@example.com` | 2026-11-21 | Verified Commuter |
| **`K9P2X4M7B1`** | `david_chen` | `david@example.com` | 2026-11-21 | Verified Commuter |
| **`D4N8W1Q6Z2`** | `ananya_sen` | `ananya@example.com` | 2026-11-22 | Verified Commuter |
| **`H2T7L9C3Y5`** | `marcus_v` | `marcus@example.com` | 2026-11-22 | Verified Commuter |


---

### 🔍 Database Schema Specifications

1. **`Unique User ID`**: 10-character alphanumeric unique identifier (e.g. `A7X9K2P4Q1`). Datatype: `VARCHAR(10)` / `Alphanumeric`.
2. **`Bus Number`**: Designation and corridor code of the booked transit vehicle (e.g. `101-EXPRESS`, `204-AIRPORT`).
3. **`Bus Driver`**: Full name of the assigned certified captain.
4. **`Distance (User to Bus)`**: Geodesic distance in kilometers from customer's GPS position to the bus.
5. **`Distance (User to Bus Stop)`**: Geodesic distance in kilometers from customer's GPS position to the selected pickup stop.
6. **`Picked Bus Stop Name`**: Official name of the designated transit shelter chosen by the customer.
7. **`Estimated Time of Arrival (ETA)`**: Computed wait time for bus arrival at the chosen stop.
8. **`Current Route (Road Name)`**: Specific urban arterial road, avenue, or highway through which the vehicle is traveling.
