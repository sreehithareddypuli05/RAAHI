# RAAHI v2.1 — Resilient Offline Navigation & Emergency Network

## Mapping update

The navigation screen now uses a **Google Maps-like interaction model** while using OpenStreetMap-compatible services instead of Google's proprietary map SDK:

- From / Destination search
- Real geocoding with Nominatim
- Real driving routes with OSRM
- Up to 3 returned route alternatives
- Click an alternative to switch the highlighted route
- Automatic map fit to the selected route
- Current-location button
- Click map to pin a starting location
- Start/destination markers
- Distance and ETA
- Cached route display when offline
- OpenStreetMap tile layer
- Responsive search panel for mobile/tablet/desktop

## Run

### Backend

```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally:

`http://localhost:5173`

## Important mapping behavior

1. Allow browser location permission when asked.
2. Enter a From location and press Search.
3. Select the returned location.
4. Enter a destination and press Search.
5. Select the destination.
6. Press **Get route**.
7. The map automatically fits the route and shows route alternatives when the routing service provides them.
8. Press **Prepare Safety Pack** before going offline.

The application does not use fake roads or fake coordinates.

## If the map is blank

- Make sure the frontend has internet access for the first map load.
- Open browser DevTools → Console and Network and check whether tile requests to `tile.openstreetmap.org` are blocked.
- Check that JavaScript is enabled.
- If geolocation is denied, manually choose the From location.
- Route search requires internet the first time; prepared route data is then retained locally.

## Technical honesty

This is not the Google Maps SDK. It is a Google-Maps-like navigation UI built with React + Leaflet + OpenStreetMap + Nominatim + OSRM. This avoids requiring a Google Maps API key and keeps the project aligned with the RAAHI specification's open-data requirement.

True phone-to-phone Bluetooth mesh networking is not claimed as guaranteed browser functionality; the Connect screen labels relay as a prototype/simulation.
