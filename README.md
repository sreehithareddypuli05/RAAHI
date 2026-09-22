Pasted text.txt
Document
main problem is current location is nt gone broo to enter source and destination

Broo 😎 use this one prompt in Claude to generate the complete professional README. It also tells Claude exactly where to put your screenshots.

Create a complete, professional, GitHub-ready README.md for my project:

# RAAHI v2.1 — Resilient Offline Navigation & Emergency Network

The README must be polished enough for a college project evaluation, GitHub portfolio, internship review, and recruiter viewing.

IMPORTANT:
- Give me the COMPLETE README.md in ONE single Markdown code block.
- Do not explain the README outside the code block.
- Do not give me multiple versions.
- Do not omit sections.
- Keep all technical claims honest.
- Do not invent features that are not mentioned below.

==================================================
PROJECT DESCRIPTION
==================================================

RAAHI stands for:

Resilient Offline Navigation & Emergency Network

Core concept:

NAVIGATE • PROTECT • CONNECT

RAAHI is an offline-first navigation and emergency resilience platform designed to help users continue navigation and prepare emergency communication when internet connectivity is weak, unavailable, or intermittent.

The project uses real geographic/open mapping data and does not intentionally use fake roads, fake hospitals, fake coordinates, fake live traffic, or fake emergency response times.

==================================================
MAPPING FEATURES
==================================================

The navigation screen provides a Google Maps-like interaction model while NOT using Google's proprietary Maps SDK.

Features:

- From / Destination search
- Real geocoding using Nominatim
- Real driving routes using OSRM
- Up to 3 returned route alternatives when available
- Click an alternative route to switch the highlighted route
- Automatic map fit to the selected route
- Current-location button
- Click map to pin a starting location
- Start marker
- Destination marker
- Distance
- ETA
- Cached route display when offline
- OpenStreetMap tile layer
- Responsive search panel for mobile/tablet/desktop

Important:
The application allows users to manually enter both From and Destination locations. The current location is NOT forced as the source.

==================================================
SAFETY PACK
==================================================

Before going offline, the user can:

1. Search a source
2. Search a destination
3. Generate a real route
4. Review route alternatives
5. Prepare a Safety Pack
6. Store relevant information locally
7. Continue using available cached information when offline

==================================================
OFFLINE FEATURES
==================================================

RAAHI follows an offline-first approach.

When connectivity is unavailable:

- Previously prepared route information can remain available
- Cached information can be displayed
- Offline status is shown
- Emergency information can be stored locally
- Voice messages can be queued
- Pending information can be synchronized when connectivity returns

Do not claim that the application can perform every online operation offline.

Fresh geocoding and fresh online route requests normally require internet unless the necessary information has already been cached.

==================================================
NEARBY SAFETY
==================================================

RAAHI includes a Nearby Safety concept for locations such as:

- Hospitals
- Police stations
- Fuel stations
- Other configured safety locations

The README must explain that cached information should not be presented as live information.

==================================================
EMERGENCY MODE
==================================================

Emergency Mode can capture available information such as:

- Location
- Timestamp
- Journey context
- Emergency category
- Voice message

When there is no network:

PENDING SYNC

When connectivity returns:

SYNC → SYNCED

Do not claim that an emergency notification was delivered unless synchronization actually succeeds.

==================================================
VOICE MESSAGES
==================================================

The application uses browser media capabilities to record voice messages.

Offline flow:

Record voice
↓
Store locally
↓
PENDING
↓
Internet restored
↓
Synchronize

==================================================
CONNECT / RELAY
==================================================

RAAHI includes a Connect concept where nearby users can conceptually relay information when conventional internet connectivity is unavailable.

Example:

User A
↓
Nearby User B
↓
Relay
↓
Nearby User C
↓
Internet Available
↓
Server

IMPORTANT TECHNICAL HONESTY:

True phone-to-phone Bluetooth mesh networking cannot be guaranteed using ordinary browser APIs across all devices and browsers.

Therefore, describe the current Connect/Relay implementation as a prototype/simulation.

Do NOT claim production-grade Bluetooth mesh networking.

==================================================
TECH STACK
==================================================

Frontend:
- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Leaflet
- React-Leaflet
- Lucide Icons

Offline/browser:
- IndexedDB
- Service Worker
- PWA
- Geolocation API
- MediaRecorder API

Backend:
- Python
- FastAPI
- PostgreSQL / SQLite
- JWT/session authentication
- Password hashing

Mapping:
- OpenStreetMap
- Nominatim
- OSRM

==================================================
BACKEND SETUP
==================================================

Use these commands:

cd backend

python -m pip install -r requirements.txt

python -m uvicorn app.main:app --reload --port 8000

Backend normally runs at:

http://localhost:8000

FastAPI docs:

http://localhost:8000/docs

==================================================
FRONTEND SETUP
==================================================

Use:

cd frontend

npm install

npm run dev

Vite normally runs at:

http://localhost:5173

==================================================
NAVIGATION USAGE
==================================================

Explain clearly:

1. Open RAAHI
2. Allow location permission if current location is required
3. Enter a From location
4. Search and select the source
5. Enter a Destination
6. Search and select the destination
7. Click Get Route
8. Review available route alternatives
9. Select the preferred route
10. Prepare Safety Pack
11. Start the journey
12. Disable internet
13. Verify Offline Mode and cached information

==================================================
OFFLINE DEMO
==================================================

Include a professional demonstration workflow:

Internet Available
↓
Search Destination
↓
Prepare Safety Pack
↓
Route and safety information cached
↓
Start Journey
↓
Disable Internet
↓
OFFLINE MODE
↓
Continue using local information
↓
Simulate blocked road
↓
Calculate/select alternate route when local routing data permits
↓
Nearby Safety
↓
Emergency Mode
↓
Capture emergency information
↓
Record voice message
↓
PENDING SYNC
↓
Restore Internet
↓
Synchronize
↓
SYNCED

Be honest that offline routing depends on locally available routing/network data.

==================================================
SCREENSHOTS — VERY IMPORTANT
==================================================

Create a professional "📸 Screenshots" section.

I will create this folder in my GitHub project:

screenshots/

Tell me to place my images there with these exact names:

screenshots/home.png
screenshots/navigation.png
screenshots/route.png
screenshots/safety-pack.png
screenshots/offline-mode.png
screenshots/emergency.png

Use these exact Markdown image paths:

![RAAHI Home](screenshots/home.png)

![Navigation](screenshots/navigation.png)

![Route Planning](screenshots/route.png)

![Safety Pack](screenshots/safety-pack.png)

![Offline Mode](screenshots/offline-mode.png)

![Emergency Mode](screenshots/emergency.png)

IMPORTANT:
Do NOT use local computer paths such as:
C:\Users\...
Do NOT use fake URLs.
Use only relative GitHub paths such as:
screenshots/home.png

Make the screenshots section visually professional.

==================================================
PROJECT STRUCTURE
==================================================

Show a clean project structure similar to:

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

Mention that the exact structure can vary based on implementation.

==================================================
DATA STATUS
==================================================

Include a professional table explaining:

LIVE
CACHED
OFFLINE
LOCALLY CALCULATED
PENDING SYNC
LAST UPDATED

==================================================
FAILURE HANDLING
==================================================

Explain how the application handles:

- Internet lost
- GPS unavailable
- Routing unavailable
- Upload failure
- Duplicate synchronization
- Relay unavailable

Important:
Never claim or imply that fake route/coordinates are generated when routing is unavailable.

==================================================
SECURITY & PRIVACY
==================================================

Include:

- Password hashing
- Authentication
- Secure token handling
- Least-privilege permissions
- User-controlled location sharing
- Controlled emergency information
- Audio validation
- Avoid unnecessary exact-location logging
- Server-side authorization

Mention HTTPS and secure production authentication practices for deployment.

==================================================
TECHNICAL LIMITATIONS
==================================================

Include a clear section explaining:

1. Fresh geocoding requires internet.
2. Fresh OSRM routing normally requires internet.
3. Offline route availability depends on cached/local data.
4. GPS may be unavailable.
5. Browser Bluetooth mesh networking is not guaranteed.
6. Connect/Relay is currently a prototype/simulation.
7. Emergency data marked PENDING SYNC is not confirmed delivered until synchronization succeeds.

==================================================
CURRENT IMPLEMENTATION STATUS
==================================================

Create professional checklists for:

Mapping:
- From search
- Destination search
- Nominatim
- OSRM
- Route alternatives
- Route selection
- Map fitting
- Current location
- Map-click location
- Markers
- Distance
- ETA
- OpenStreetMap
- Cached route
- Responsive UI

Resilience:
- Offline-first design
- Local caching
- Safety Pack
- Offline status
- Pending synchronization
- Emergency workflow
- Voice queue
- Relay prototype

Future:
- Full production offline routing graph
- Native Bluetooth mesh
- Production peer-to-peer relay
- Advanced synchronization
- Expanded safety datasets
- Automated testing
- Production deployment

==================================================
TROUBLESHOOTING
==================================================

Include troubleshooting for:

- Blank map
- Location permission denied
- Route search failure
- Backend not starting
- Frontend not starting

==================================================
CONTRIBUTING
==================================================

Include standard Git workflow:

git clone <repository-url>
cd RAAHI
git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature

==================================================
LICENSE
==================================================

Include a License section, but do not falsely claim a license has been selected.

Say that the project should use the license required by the project/institution, with MIT as an example.

==================================================
FINAL STYLE
==================================================

Make the README:

- Professional
- Clean
- Modern
- Easy to read
- Recruiter-friendly
- Suitable for GitHub
- Suitable for academic evaluation
- Well structured
- Use useful emojis, but don't overuse them
- Use tables where useful
- Use Mermaid diagrams only where they improve understanding
- Use code blocks for commands
- Use badges only if they can be represented without fake information
- Do not invent GitHub stars, build status, coverage, deployment URLs, contributors, or statistics
- Do not invent screenshots
- Do not invent APIs
- Do not claim unsupported features

At the very top include:

# 🚗 RAAHI v2.1
## Resilient Offline Navigation & Emergency Network

> **NAVIGATE • PROTECT • CONNECT**

End the README with:

## 🚗 RAAHI

### Navigate when connected. Stay prepared when disconnected.

**NAVIGATE • PROTECT • CONNECT**

OUTPUT REQUIREMENT:
Return ONLY the complete README.md inside ONE Markdown code block.
not prompt broo just for copy paste broo

Got you broo 😎 You want the actual README content directly, not a prompt.

Copy-paste this entire thing into your README.md:

# 🚗 RAAHI v2.1
## Resilient Offline Navigation & Emergency Network

> **NAVIGATE • PROTECT • CONNECT**

RAAHI is an **offline-first navigation and emergency resilience platform** designed to help users continue navigation and prepare emergency communication when internet connectivity is weak, unavailable, or intermittent.

It combines real-world mapping services, local caching, offline-first functionality, emergency workflows, and a prototype relay communication concept to provide a resilient navigation experience.

---

## 🌟 Features

### 🗺️ Smart Navigation

RAAHI provides a Google Maps-like navigation experience using open mapping technologies instead of Google's proprietary Maps SDK.

- 📍 From / Destination search
- 🔎 Real geocoding using Nominatim
- 🚗 Real driving routes using OSRM
- 🔀 Up to 3 route alternatives when available
- 🖱️ Click an alternative route to switch the highlighted route
- 📐 Automatic map fitting
- 📍 Current-location button
- 🗺️ Click map to select a location
- 🏁 Start and destination markers
- 📏 Distance
- ⏱️ Estimated travel time
- 📦 Cached route display when offline
- 🌍 OpenStreetMap tile layer
- 📱 Responsive interface for mobile, tablet, and desktop

---

## 📍 Source & Destination

Users can manually enter both the starting location and destination.

### From Location

Users can:

- Search for a location
- Select a search result
- Use their current location
- Click directly on the map

### Destination

Users can:

- Search for a destination
- Select a search result
- Select a destination from the map

The current location is **not forced as the starting point**.

---

# 🌐 Mapping Technology

RAAHI does **not** use the Google Maps SDK.

Instead, it uses open-data-compatible technologies:

| Technology | Purpose |
|---|---|
| OpenStreetMap | Map data and map tiles |
| Leaflet | Interactive map |
| React-Leaflet | React integration |
| Nominatim | Geocoding |
| OSRM | Driving route calculation |

### Mapping Architecture

```text
                 RAAHI Frontend
                       │
                       ▼
                React + Leaflet
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
   OpenStreetMap    Nominatim      OSRM
    Map Tiles       Geocoding     Routing
          │            │            │
          └────────────┼────────────┘
                       ▼
                 Navigation UI

This avoids requiring a Google Maps API key and keeps the project aligned with the open-data requirement.

🗺️ Navigation Workflow
Enter From Location
        ↓
Search
        ↓
Select Location
        ↓
Enter Destination
        ↓
Search
        ↓
Select Destination
        ↓
Get Route
        ↓
OSRM Routing
        ↓
Display Route
        ↓
Show Available Alternatives
        ↓
Select Route
        ↓
Fit Map to Selected Route
📦 Safety Pack

Before entering an area with poor or unavailable connectivity, users can prepare a Safety Pack.

The Safety Pack is intended to preserve important navigation and safety information locally.

Safety Pack Workflow
Search Destination
        ↓
Generate Route
        ↓
Review Route
        ↓
Prepare Safety Pack
        ↓
Store Data Locally
        ↓
Disable Internet
        ↓
Continue Using Cached Data
📡 Offline Mode

RAAHI follows an offline-first architecture.

When connectivity is unavailable:

Previously prepared route information can remain available
Cached navigation information can be displayed
Offline status is shown
Emergency information can be stored locally
Voice messages can be queued
Pending information can be synchronized when connectivity returns

Fresh geocoding and fresh online route requests normally require internet connectivity unless the required information has already been cached.

📴 Offline Navigation Flow
Internet Available
        ↓
Prepare Safety Pack
        ↓
Route/Data Stored Locally
        ↓
Internet Disabled
        ↓
OFFLINE MODE
        ↓
Use Cached Information
        ↓
Continue Journey
🏥 Nearby Safety

RAAHI provides access to nearby safety-related locations such as:

🏥 Hospitals
👮 Police stations
⛽ Fuel stations
📍 Other configured safety locations

This functionality is useful when connectivity or battery availability becomes a concern.

Cached information should always be distinguished from live information.

🚨 Emergency Mode

RAAHI includes an emergency workflow designed around local data capture and later synchronization.

Emergency information can include:

📍 Current or last-known location
🕐 Timestamp
🧭 Journey context
🚨 Emergency category
🎙️ Voice message
Emergency Workflow
Emergency Triggered
        ↓
Capture Available Information
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

An emergency event is not considered successfully delivered until synchronization has actually completed.

🎙️ Voice Messages

RAAHI supports voice-message recording using browser media capabilities.

When connectivity is unavailable, the voice message can be stored locally and marked as pending.

Record Voice Message
        ↓
Store Locally
        ↓
PENDING
        ↓
Internet Restored
        ↓
Synchronize
        ↓
SYNCED
🔗 Connect & Relay

RAAHI includes a Connect concept for communication between nearby users when conventional internet connectivity is unavailable.

The intended concept is:

User A
   │
   ▼
Nearby User B
   │
   ▼
Relay
   │
   ▼
Nearby User C
   │
   ▼
Internet Available
   │
   ▼
RAAHI Server
⚠️ Technical Limitation

True phone-to-phone Bluetooth mesh networking cannot be guaranteed using ordinary browser APIs across all devices and browsers.

Therefore, the current web implementation treats Connect / Relay as a prototype or simulation.

RAAHI does not claim that the current browser application provides production-grade Bluetooth mesh networking.

💾 Offline-First Storage

RAAHI uses browser-side storage mechanisms to preserve important information locally.

Potential locally stored information includes:

Journeys
Routes
Safety Packs
Safety POIs
Emergency events
Voice-message queue
Relay packets
Synchronization queue
Offline status
                  RAAHI
                    │
                    ▼
             Browser Storage
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
      Routes       POIs      Emergency
        │           │           │
        └───────────┼───────────┘
                    ▼
                Offline Use
📱 Responsive Design

RAAHI is designed for:

📱 Mobile
📲 Tablet
💻 Desktop

The navigation screen includes a responsive search panel and interactive map layout.

🛠️ Technology Stack
Frontend
React
TypeScript
Vite
React Router
Tailwind CSS
Leaflet
React-Leaflet
Lucide Icons
Backend
Python
FastAPI
PostgreSQL / SQLite
JWT / Session Authentication
Password Hashing
Offline & Browser Technologies
IndexedDB
Service Worker
Progressive Web App (PWA)
Geolocation API
MediaRecorder API
Mapping
OpenStreetMap
Nominatim
OSRM
📂 Project Structure
RAAHI/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── ...
│
├── screenshots/
│   ├── home.png
│   ├── navigation.png
│   ├── route.png
│   ├── safety-pack.png
│   ├── offline-mode.png
│   └── emergency.png
│
├── README.md
├── .gitignore
└── ...
🚀 Getting Started
Prerequisites

Install:

Python 3.x
Node.js
npm
Git
Modern web browser
⚙️ Backend Setup

Open a terminal:

cd backend

Install dependencies:

python -m pip install -r requirements.txt

Start the FastAPI server:

python -m uvicorn app.main:app --reload --port 8000

Backend:

http://localhost:8000

FastAPI documentation:

http://localhost:8000/docs
💻 Frontend Setup

Open another terminal:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

Vite normally runs at:

http://localhost:5173
🧭 How to Use Navigation
Start the backend.
Start the frontend.
Open RAAHI in the browser.
Allow location permission if required.
Enter a From location.
Press Search.
Select the source location.
Enter a Destination.
Press Search.
Select the destination.
Press Get Route.
Review available route alternatives.
Select the required route.
Press Prepare Safety Pack.
Start the journey.
Disable internet.
Verify OFFLINE MODE and cached information.
🧪 Offline Demo
Internet Available
        ↓
Search Destination
        ↓
Prepare Safety Pack
        ↓
Route & Safety Information Cached
        ↓
Start Journey
        ↓
Disable Internet
        ↓
OFFLINE MODE
        ↓
Continue Using Local Information
        ↓
Simulate Blocked Road
        ↓
Calculate / Select Alternate Route
        ↓
Nearby Safety
        ↓
Emergency Mode
        ↓
Capture Emergency Information
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

Offline route calculation depends on the routing/network data available locally.

📸 Screenshots

Add your screenshots inside the screenshots/ folder in the project root.

Your project should look like:

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
🏠 Home / Navigation

🗺️ Navigation Screen

🚗 Route Planning

📦 Safety Pack

📡 Offline Mode

🚨 Emergency Mode

Important: Do not use paths such as C:\Users\.... Use relative paths like screenshots/home.png.

🏷️ Data Status
Status	Meaning
🟢 LIVE	Data obtained from an active online service
🔵 CACHED	Data previously stored locally
🟠 OFFLINE	Device currently has no network connectivity
🟣 LOCALLY CALCULATED	Result calculated using local data
🟡 PENDING SYNC	Data waiting to be synchronized
⚪ LAST UPDATED	Indicates the latest known update time
🧯 Failure Handling
Internet Lost
Internet Lost
     ↓
OFFLINE MODE
     ↓
Use Available Cached Data
GPS Unavailable
GPS Unavailable
     ↓
Use Last Known Information
     ↓
Mark Information as Stale
Routing Unavailable
Routing Unavailable
     ↓
Do NOT Generate Fake Route
     ↓
Inform User
Upload Failure
Upload Failed
     ↓
Store Locally
     ↓
Retry Later
Duplicate Synchronization

Synchronization should avoid creating duplicate server-side records when the same offline event is retried.

Relay Unavailable
Relay Unavailable
     ↓
Keep Information Locally
     ↓
Retry When Possible
🔐 Security & Privacy

RAAHI considers security and privacy throughout the application architecture.

Important principles include:

Password hashing
Authenticated backend requests
Secure token handling
Least-privilege permissions
User-controlled location sharing
Controlled access to emergency information
Audio validation
Avoiding unnecessary exact-location logging
Server-side authorization

For production deployment:

HTTPS should be enabled.
Production authentication should be configured securely.
Tokens should follow secure storage practices.
Backend authorization should always be enforced server-side.
⚠️ Technical Limitations
Mapping

Fresh geocoding and fresh route calculation normally require internet connectivity.

Offline Routing

Offline routing depends on locally available routing/network data.

GPS

Location services may be unavailable or inaccurate depending on device and browser conditions.

Bluetooth

True cross-device Bluetooth mesh networking is not guaranteed by standard browser environments.

Connect / Relay

The current Connect / Relay functionality is a prototype or simulation and should not be considered production-grade Bluetooth mesh networking.

Emergency Communication

An emergency event marked PENDING SYNC does not mean that it has been delivered.

It becomes confirmed only after successful synchronization.

🌍 Real Geographic Data

RAAHI is designed to use real geographic and open mapping data.

The project does not intentionally use:

❌ Fake roads
❌ Fake hospitals
❌ Fake coordinates
❌ Fake live traffic
❌ Fake emergency response times

Mapping technologies include:

OpenStreetMap
Nominatim
OSRM
📊 System Architecture
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
       ┌─────┴─────┐       │       ┌─────┴─────┐
       ▼           ▼       ▼       ▼           ▼
   Nominatim      OSRM   Local    Nearby      Sync
                        Storage    Users
             │             │             │
             └─────────────┼─────────────┘
                           ▼
                    Offline Experience
📋 Current Implementation Status
🗺️ Mapping
 From location search
 Destination search
 Nominatim geocoding
 OSRM route calculation
 Route alternatives
 Route selection
 Automatic map fitting
 Current-location button
 Map-click location selection
 Start marker
 Destination marker
 Distance
 ETA
 OpenStreetMap tile layer
 Cached route display
 Responsive navigation panel
📦 Resilience
 Offline-first design
 Local data caching
 Safety Pack concept
 Offline status
 Pending synchronization concept
 Emergency workflow
 Voice-message queue concept
 Relay prototype / simulation
🔮 Future Development
 Full production offline routing graph
 Advanced local route recalculation
 Native Bluetooth mesh networking
 Production peer-to-peer relay
 Advanced background synchronization
 Expanded safety POI datasets
 Production deployment infrastructure
 Comprehensive automated testing
🔮 Future Enhancements
📱 Native Android/iOS application
🗺️ Advanced offline routing graphs
🔗 Native peer-to-peer communication
🔄 Background synchronization
🏥 Expanded safety POI datasets
🔐 Stronger end-to-end security
🧪 Comprehensive automated testing
☁️ Production deployment infrastructure
🐛 Troubleshooting
Map Is Blank
Make sure the frontend has internet access during the first map load.
Open browser DevTools.
Check the Console for JavaScript errors.
Open the Network tab.
Check whether OpenStreetMap tile requests are blocked.
Make sure JavaScript is enabled.
Refresh the page.
Current Location Is Not Available
Check browser location permissions.
Make sure the device provides location information.
Manually choose a From location.
Use map-click location selection.
Route Search Does Not Work

Fresh route searches normally require internet connectivity.

Check:

Frontend
   ↓
Routing Request
   ↓
OSRM
   ↓
Route

Also verify that both selected locations contain valid coordinates.

Backend Does Not Start

Run:

cd backend
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
Frontend Does Not Start

Run:

cd frontend
npm install
npm run dev
🤝 Contributing

Contributions are welcome.

Clone the repository
git clone <repository-url>
cd RAAHI
Create a feature branch
git checkout -b feature/your-feature
Commit changes
git add .
git commit -m "Add your feature"
Push changes
git push origin feature/your-feature

Then create a Pull Request on GitHub.

🐛 Reporting Issues

When reporting an issue, provide:

Operating system
Browser and version
Frontend console errors
Backend terminal errors
Steps to reproduce
Screenshots when applicable
Whether the issue occurs online or offline
📜 License

This project should use the license required by the project or institution.

For an open-source release, an MIT License may be used if appropriate.

👩‍💻 Project Information
RAAHI v2.1

Resilient Offline Navigation & Emergency Network

Core Technologies

React • TypeScript • Vite • FastAPI • Python • Leaflet • OpenStreetMap • Nominatim • OSRM • IndexedDB • PWA

🌟 Project Vision

RAAHI is built around a simple principle:

Navigation and emergency preparedness should not completely depend on continuous internet connectivity.

By combining real geographic data, local caching, offline-first design, emergency workflows, and a prototype relay concept, RAAHI explores how navigation systems can remain useful during connectivity interruptions.

🚗 RAAHI
Navigate when connected. Stay prepared when disconnected.

NAVIGATE • PROTECT • CONNECT


### 📸 Where exactly to put your images

Inside your **RAAHI project root**, create:

```text
screenshots

Put your images there:

screenshots/
├── home.png
├── navigation.png
├── route.png
├── safety-pack.png
├── offline-mode.png
└── emergency.png

Then the README already has the correct paths. After that:

git add README.md screenshots/
git commit -m "Add professional README and screenshots"
git push

Done broo 🔥

give me file broo for readme file

Done broo 🔥

Download README.md

Just put this file in your RAAHI project root and keep your screenshots inside:

RAAHI/
├── README.md
├── frontend/
├── backend/
└── screenshots/
    ├── home.png
    ├── navigation.png
    ├── route.png
    ├── safety-pack.png
    ├── offline-mode.png
    └── emergency.png

README.md
Document

Library
/
README.md
🚗 RAAHI v2.1
Resilient Offline Navigation & Emergency Network

NAVIGATE • PROTECT • CONNECT

RAAHI is an offline-first navigation and emergency resilience platform designed to help users continue navigation and prepare emergency communication when internet connectivity is weak, unavailable, or intermittent.

🌟 Features
🗺️ From / Destination search
🔎 Nominatim geocoding
🚗 OSRM real driving routes
🔀 Route alternatives
📍 Current-location support
🖱️ Map-click location selection
📏 Distance and ETA
📦 Safety Pack
📡 Offline-first navigation
🏥 Nearby safety locations
🚨 Emergency Mode
🎙️ Offline voice-message queue
🔄 Synchronization when connectivity returns
🔗 Connect / Relay prototype
📱 Responsive mobile, tablet and desktop UI
🌐 Mapping Technology

RAAHI does not use the Google Maps SDK.

Technology	Purpose
OpenStreetMap	Map data and tiles
Leaflet	Interactive map
React-Leaflet	React integration
Nominatim	Geocoding
OSRM	Driving routes
📦 Safety Pack

Before entering an area with poor connectivity, users can prepare a Safety Pack containing locally available navigation and safety information.

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
📡 Offline Mode

RAAHI follows an offline-first architecture.

When connectivity is unavailable:

Previously prepared route information can remain available
Cached navigation information can be displayed
Offline status is shown
Emergency information can be stored locally
Voice messages can be queued
Pending information can synchronize when connectivity returns

Fresh geocoding and fresh online route requests normally require internet unless the required information is already cached.

🏥 Nearby Safety

RAAHI provides access to safety-related locations such as:

🏥 Hospitals
👮 Police stations
⛽ Fuel stations
📍 Other configured safety locations
🚨 Emergency Mode

Emergency information can include:

📍 Current or last-known location
🕐 Timestamp
🧭 Journey context
🚨 Emergency category
🎙️ Voice message
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
🎙️ Voice Messages

Voice messages can be recorded using browser media capabilities. When offline, they can be stored locally and marked as pending.

🔗 Connect & Relay

RAAHI includes a Connect concept for nearby-user communication when conventional internet connectivity is unavailable.

User A → Nearby User B → Relay → User C → Internet → RAAHI Server

Technical limitation: True phone-to-phone Bluetooth mesh networking cannot be guaranteed using ordinary browser APIs. The current Connect / Relay functionality should therefore be treated as a prototype or simulation.

💾 Offline-First Storage

Potential locally stored information includes:

Journeys
Routes
Safety Packs
Safety POIs
Emergency events
Voice-message queue
Relay packets
Synchronization queue
Offline status
🛠️ Technology Stack
Frontend
React
TypeScript
Vite
React Router
Tailwind CSS
Leaflet
React-Leaflet
Lucide Icons
Backend
Python
FastAPI
PostgreSQL / SQLite
JWT / Session Authentication
Password Hashing
Browser / Offline
IndexedDB
Service Worker
Progressive Web App (PWA)
Geolocation API
MediaRecorder API
📂 Project Structure
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
🚀 Getting Started
Prerequisites
Python 3.x
Node.js
npm
Git
Modern web browser
Backend
cd backend
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000

Backend:

http://localhost:8000

FastAPI docs:

http://localhost:8000/docs
Frontend

Open another terminal:

cd frontend
npm install
npm run dev

Vite normally runs at:

http://localhost:5173
🧭 Navigation Workflow
Start the backend.
Start the frontend.
Open RAAHI in the browser.
Allow location permission if required.
Enter a From location.
Search and select the source.
Enter a Destination.
Search and select the destination.
Press Get Route.
Review available route alternatives.
Select the route.
Prepare the Safety Pack.
Start the journey.
Disable internet.
Verify OFFLINE MODE and cached information.
🧪 Offline Demo
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
📸 Screenshots

Put your screenshots inside the screenshots/ folder in the project root.

🗺️ Navigation


screenshots\Screenshot 2026-09-22 184650.png

📦 Safety Pack

screenshots\Screenshot 2026-09-22 184823.png


📡 Offline Mode

screenshots\Screenshot 2026-09-22 184848.png


🚨 Emergency Mode
screenshots\Screenshot 2026-09-22 184901.png



Important: Use relative paths such as screenshots/home.png, not C:\Users\... paths.

🏷️ Data Status
Status	Meaning
🟢 LIVE	Data from an active online service
🔵 CACHED	Previously stored locally
🟠 OFFLINE	No network connectivity
🟣 LOCALLY CALCULATED	Calculated using local data
🟡 PENDING SYNC	Waiting for synchronization
⚪ LAST UPDATED	Latest known update time
🧯 Failure Handling
Internet Lost
Internet Lost → OFFLINE MODE → Use Available Cached Data
GPS Unavailable
GPS Unavailable → Last Known Information → Mark as Stale
Routing Unavailable
Routing Unavailable → Do NOT Generate Fake Route → Inform User
Upload Failure
Upload Failed → Store Locally → Retry Later
Relay Unavailable
Relay Unavailable → Keep Information Locally → Retry
🔐 Security & Privacy
Password hashing
Authenticated backend requests
Secure token handling
Least-privilege permissions
User-controlled location sharing
Controlled emergency-data access
Audio validation
Avoid unnecessary exact-location logging
Server-side authorization
HTTPS for production deployment
⚠️ Technical Limitations
Fresh geocoding and online route calculation normally require internet.
Offline routing depends on locally available routing/network data.
GPS accuracy depends on device and browser conditions.
Browser Bluetooth mesh networking is not guaranteed.
Connect / Relay is currently a prototype or simulation.
PENDING SYNC does not mean an emergency message was delivered; successful synchronization must be confirmed.
🌍 Real Geographic Data

RAAHI is designed to use real geographic and open mapping data.

The project does not intentionally use:

❌ Fake roads
❌ Fake hospitals
❌ Fake coordinates
❌ Fake live traffic
❌ Fake emergency response times

Mapping technologies include OpenStreetMap, Nominatim and OSRM.

📊 System Architecture
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
📋 Implementation Status
Mapping

From location search

Destination search

Nominatim geocoding

OSRM route calculation

Route alternatives

Route selection

Map fitting

Current-location button

Map-click location selection

Start and destination markers

Distance and ETA

OpenStreetMap tiles

Cached route display

Responsive navigation panel

Resilience

Offline-first design

Local data caching

Safety Pack concept

Offline status

Pending synchronization

Emergency workflow

Voice-message queue concept

Relay prototype / simulation

Future Development

Full production offline routing graph

Advanced local route recalculation

Native Bluetooth mesh networking

Production peer-to-peer relay

Advanced background synchronization

Expanded safety POI datasets

Production deployment infrastructure

Comprehensive automated testing

🔮 Future Enhancements
📱 Native Android/iOS application
🗺️ Advanced offline routing graphs
🔗 Native peer-to-peer communication
🔄 Background synchronization
🏥 Expanded safety POI datasets
🔐 Stronger end-to-end security
🧪 Comprehensive automated testing
☁️ Production deployment infrastructure
🐛 Troubleshooting
Map Is Blank
Make sure the frontend has internet access during the first map load.
Open browser DevTools.
Check the Console for JavaScript errors.
Check the Network tab.
Check whether OpenStreetMap tile requests are blocked.
Refresh the page.
Current Location Is Not Available
Check browser location permissions.
Make sure the device provides location information.
Manually choose a From location.
Use map-click location selection.
Route Search Does Not Work

Fresh route searches normally require internet connectivity. Verify that both selected locations contain valid coordinates.

Backend Does Not Start
cd backend
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
Frontend Does Not Start
cd frontend
npm install
npm run dev
🤝 Contributing
git clone <repository-url>
cd RAAHI
git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature

Then create a Pull Request on GitHub.

📜 License

This project should use the license required by the project or institution. For an open-source release, an MIT License may be used if appropriate.

👩‍💻 Project Information
RAAHI v2.1

Resilient Offline Navigation & Emergency Network

React • TypeScript • Vite • FastAPI • Python • Leaflet • OpenStreetMap • Nominatim • OSRM • IndexedDB • PWA

🌟 Project Vision

Navigation and emergency preparedness should not completely depend on continuous internet connectivity.

RAAHI combines real geographic data, local caching, offline-first design, emergency workflows, and a prototype relay concept to explore resilient navigation during connectivity interruptions.

🚗 RAAHI
Navigate when connected. Stay prepared when disconnected.

NAVIGATE • PROTECT • CONNECT