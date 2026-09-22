# 🚗 RAAHI v2.1
## Resilient Offline Navigation & Emergency Network

> **NAVIGATE • PROTECT • CONNECT**

RAAHI is an **offline-first navigation and emergency resilience platform** designed to help users continue navigation and prepare emergency communication when internet connectivity is weak, unavailable, or intermittent.

## 🌟 Features

- 🗺️ From / Destination search
- 🔎 Nominatim geocoding
- 🚗 OSRM real driving routes
- 🔀 Route alternatives
- 📍 Current-location support
- 🖱️ Map-click location selection
- 📏 Distance and ETA
- 📦 Safety Pack
- 📡 Offline-first navigation
- 🏥 Nearby safety locations
- 🚨 Emergency Mode
- 🎙️ Offline voice-message queue
- 🔄 Synchronization when connectivity returns
- 🔗 Connect / Relay prototype
- 📱 Responsive mobile, tablet and desktop UI

## 🌐 Mapping Technology

RAAHI does **not** use the Google Maps SDK.

| Technology | Purpose |
|---|---|
| OpenStreetMap | Map data and tiles |
| Leaflet | Interactive map |
| React-Leaflet | React integration |
| Nominatim | Geocoding |
| OSRM | Driving routes |

## 📦 Safety Pack

Before entering an area with poor connectivity, users can prepare a Safety Pack containing locally available navigation and safety information.

```text
Search Destination
        ↓
Generate Route
        ↓
Prepare Safety Pack
        ↓
Store Data Locally
        ↓
Disable Internet
        ↓
Continue Using Cached Data
```

## 📡 Offline Mode

RAAHI follows an **offline-first architecture**.

When connectivity is unavailable:

- Previously prepared route information can remain available
- Cached navigation information can be displayed
- Offline status is shown
- Emergency information can be stored locally
- Voice messages can be queued
- Pending information can synchronize when connectivity returns

Fresh geocoding and fresh online route requests normally require internet unless the required information is already cached.

## 🏥 Nearby Safety

RAAHI provides access to safety-related locations such as:

- 🏥 Hospitals
- 👮 Police stations
- ⛽ Fuel stations
- 📍 Other configured safety locations

## 🚨 Emergency Mode

Emergency information can include:

- 📍 Current or last-known location
- 🕐 Timestamp
- 🧭 Journey context
- 🚨 Emergency category
- 🎙️ Voice message

```text
Emergency Triggered
        ↓
Capture Information
        ↓
Store Locally
        ↓
PENDING SYNC
        ↓
Connectivity Restored
        ↓
Synchronize
        ↓
SYNCED
```

## 🎙️ Voice Messages

Voice messages can be recorded using browser media capabilities. When offline, they can be stored locally and marked as pending.

## 🔗 Connect & Relay

RAAHI includes a Connect concept for nearby-user communication when conventional internet connectivity is unavailable.

```text
User A → Nearby User B → Relay → User C → Internet → RAAHI Server
```

> **Technical limitation:** True phone-to-phone Bluetooth mesh networking cannot be guaranteed using ordinary browser APIs. The current Connect / Relay functionality should therefore be treated as a prototype or simulation.

## 💾 Offline-First Storage

Potential locally stored information includes:

- Journeys
- Routes
- Safety Packs
- Safety POIs
- Emergency events
- Voice-message queue
- Relay packets
- Synchronization queue
- Offline status

## 🛠️ Technology Stack

### Frontend
- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Leaflet
- React-Leaflet
- Lucide Icons

### Backend
- Python
- FastAPI
- PostgreSQL / SQLite
- JWT / Session Authentication
- Password Hashing

### Browser / Offline
- IndexedDB
- Service Worker
- Progressive Web App (PWA)
- Geolocation API
- MediaRecorder API

## 📂 Project Structure

```text
RAAHI/
├── frontend/
├── backend/
├── screenshots/
│   ├── home.png
│   ├── navigation.png
│   ├── route.png
│   ├── safety-pack.png
│   ├── offline-mode.png
│   └── emergency.png
├── README.md
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- Python 3.x
- Node.js
- npm
- Git
- Modern web browser

### Backend

```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

Backend:

```text
http://localhost:8000
```

FastAPI docs:

```text
http://localhost:8000/docs
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite normally runs at:

```text
http://localhost:5173
```

## 🧭 Navigation Workflow

1. Start the backend.
2. Start the frontend.
3. Open RAAHI in the browser.
4. Allow location permission if required.
5. Enter a **From** location.
6. Search and select the source.
7. Enter a **Destination**.
8. Search and select the destination.
9. Press **Get Route**.
10. Review available route alternatives.
11. Select the route.
12. Prepare the Safety Pack.
13. Start the journey.
14. Disable internet.
15. Verify **OFFLINE MODE** and cached information.

## 🧪 Offline Demo

```text
Internet Available
        ↓
Search Destination
        ↓
Prepare Safety Pack
        ↓
Start Journey
        ↓
Disable Internet
        ↓
OFFLINE MODE
        ↓
Use Local Information
        ↓
Simulate Blocked Road
        ↓
Alternate Route
        ↓
Nearby Safety
        ↓
Emergency Mode
        ↓
Record Voice Message
        ↓
PENDING SYNC
        ↓
Restore Internet
        ↓
Synchronize
        ↓
SYNCED
```

## 📸 Screenshots

> Put your screenshots inside the `screenshots/` folder in the project root.


### 🗺️ Navigation

![Navigation](screenshots\Screenshot 2026-09-22 184650.png)


### 📦 Safety Pack

![Safety Pack](screenshots\Screenshot 2026-09-22 184823.png)

### 📡 Offline Mode

![Offline Mode](screenshots\Screenshot 2026-09-22 184848.png)

### 🚨 Emergency Mode

![Emergency Mode](screenshots\Screenshot 2026-09-22 184901.png)

> **Important:** Use relative paths such as `screenshots/home.png`, not `C:\Users\...` paths.

## 🏷️ Data Status

| Status | Meaning |
|---|---|
| 🟢 **LIVE** | Data from an active online service |
| 🔵 **CACHED** | Previously stored locally |
| 🟠 **OFFLINE** | No network connectivity |
| 🟣 **LOCALLY CALCULATED** | Calculated using local data |
| 🟡 **PENDING SYNC** | Waiting for synchronization |
| ⚪ **LAST UPDATED** | Latest known update time |

## 🧯 Failure Handling

### Internet Lost
```text
Internet Lost → OFFLINE MODE → Use Available Cached Data
```

### GPS Unavailable
```text
GPS Unavailable → Last Known Information → Mark as Stale
```

### Routing Unavailable
```text
Routing Unavailable → Do NOT Generate Fake Route → Inform User
```

### Upload Failure
```text
Upload Failed → Store Locally → Retry Later
```

### Relay Unavailable
```text
Relay Unavailable → Keep Information Locally → Retry
```

## 🔐 Security & Privacy

- Password hashing
- Authenticated backend requests
- Secure token handling
- Least-privilege permissions
- User-controlled location sharing
- Controlled emergency-data access
- Audio validation
- Avoid unnecessary exact-location logging
- Server-side authorization
- HTTPS for production deployment

## ⚠️ Technical Limitations

- Fresh geocoding and online route calculation normally require internet.
- Offline routing depends on locally available routing/network data.
- GPS accuracy depends on device and browser conditions.
- Browser Bluetooth mesh networking is not guaranteed.
- Connect / Relay is currently a prototype or simulation.
- `PENDING SYNC` does not mean an emergency message was delivered; successful synchronization must be confirmed.

## 🌍 Real Geographic Data

RAAHI is designed to use real geographic and open mapping data.

The project does not intentionally use:

- ❌ Fake roads
- ❌ Fake hospitals
- ❌ Fake coordinates
- ❌ Fake live traffic
- ❌ Fake emergency response times

Mapping technologies include OpenStreetMap, Nominatim and OSRM.

## 📊 System Architecture

```text
                         RAAHI
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
         NAVIGATE       PROTECT       CONNECT
             │             │             │
             ▼             ▼             ▼
       Maps & Routes    Emergency    Relay Concept
             │             │             │
             └─────────────┼─────────────┘
                           ▼
                    Offline Experience
```

## 📋 Implementation Status

### Mapping
- [x] From location search
- [x] Destination search
- [x] Nominatim geocoding
- [x] OSRM route calculation
- [x] Route alternatives
- [x] Route selection
- [x] Map fitting
- [x] Current-location button
- [x] Map-click location selection
- [x] Start and destination markers
- [x] Distance and ETA
- [x] OpenStreetMap tiles
- [x] Cached route display
- [x] Responsive navigation panel

### Resilience
- [x] Offline-first design
- [x] Local data caching
- [x] Safety Pack concept
- [x] Offline status
- [x] Pending synchronization
- [x] Emergency workflow
- [x] Voice-message queue concept
- [x] Relay prototype / simulation

### Future Development
- [ ] Full production offline routing graph
- [ ] Advanced local route recalculation
- [ ] Native Bluetooth mesh networking
- [ ] Production peer-to-peer relay
- [ ] Advanced background synchronization
- [ ] Expanded safety POI datasets
- [ ] Production deployment infrastructure
- [ ] Comprehensive automated testing

## 🔮 Future Enhancements

- 📱 Native Android/iOS application
- 🗺️ Advanced offline routing graphs
- 🔗 Native peer-to-peer communication
- 🔄 Background synchronization
- 🏥 Expanded safety POI datasets
- 🔐 Stronger end-to-end security
- 🧪 Comprehensive automated testing
- ☁️ Production deployment infrastructure

## 🐛 Troubleshooting

### Map Is Blank

1. Make sure the frontend has internet access during the first map load.
2. Open browser DevTools.
3. Check the Console for JavaScript errors.
4. Check the Network tab.
5. Check whether OpenStreetMap tile requests are blocked.
6. Refresh the page.

### Current Location Is Not Available

- Check browser location permissions.
- Make sure the device provides location information.
- Manually choose a From location.
- Use map-click location selection.

### Route Search Does Not Work

Fresh route searches normally require internet connectivity. Verify that both selected locations contain valid coordinates.

### Backend Does Not Start

```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

### Frontend Does Not Start

```bash
cd frontend
npm install
npm run dev
```

## 🤝 Contributing

```bash
git clone <repository-url>
cd RAAHI
git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
```

Then create a Pull Request on GitHub.

## 📜 License

This project should use the license required by the project or institution. For an open-source release, an MIT License may be used if appropriate.

## 👩‍💻 Project Information

### RAAHI v2.1
**Resilient Offline Navigation & Emergency Network**

**React • TypeScript • Vite • FastAPI • Python • Leaflet • OpenStreetMap • Nominatim • OSRM • IndexedDB • PWA**

## 🌟 Project Vision

> **Navigation and emergency preparedness should not completely depend on continuous internet connectivity.**

RAAHI combines real geographic data, local caching, offline-first design, emergency workflows, and a prototype relay concept to explore resilient navigation during connectivity interruptions.

---

# 🚗 RAAHI

### Navigate when connected. Stay prepared when disconnected.

**NAVIGATE • PROTECT • CONNECT**
