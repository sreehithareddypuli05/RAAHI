import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import {
  Navigation, ShieldCheck, Siren, WifiOff, Wifi, MapPin, Route as RouteIcon,
  Mic, Radio, Download, CheckCircle, AlertTriangle, LocateFixed, RefreshCw,
  ChevronRight, Menu, X, Clock, Hospital, Fuel, Building2, Search, Crosshair,
  ArrowRightLeft, Layers, Phone, BatteryLow
} from 'lucide-react';

const API = 'http://127.0.0.1:8000';
const LS = 'raahi-state-v3';
type LatLng = [number, number];
type Place = { display_name: string; lat: string; lon: string; type?: string };

type AppState = {
  origin: string; destination: string; originPos: LatLng | null; destPos: LatLng | null;
  route: any; pack: any; journey: boolean; offline: boolean; blocked: boolean;
  emergency: any; contact: string; voiceQueue: any[]; relay: boolean;
};
const initial: AppState = {
  origin:'', destination:'', originPos:null, destPos:null, route:null, pack:null,
  journey:false, offline:!navigator.onLine, blocked:false, emergency:null, contact:'', voiceQueue:[], relay:false
};
function load(): AppState { try { return { ...initial, ...JSON.parse(localStorage.getItem(LS) || '{}') }; } catch { return initial; } }
function save(s: AppState) { localStorage.setItem(LS, JSON.stringify(s)); }
function useOnline() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => { const on=()=>setOnline(true), off=()=>setOnline(false); addEventListener('online',on); addEventListener('offline',off); return()=>{removeEventListener('online',on);removeEventListener('offline',off)}; }, []);
  return online;
}
function Recenter({ pos, zoom=14 }: { pos: LatLng|null; zoom?: number }) { const map=useMap(); useEffect(()=>{ if(pos) map.flyTo(pos, zoom, {duration:.7}); },[pos,zoom,map]); return null; }
function FitRoute({ points }: { points: LatLng[] }) { const map=useMap(); useEffect(()=>{ if(points.length>1) map.fitBounds(L.latLngBounds(points), {padding:[70,70], maxZoom:15}); },[points,map]); return null; }
function LocateButton({ onLocate }: { onLocate:(p:LatLng)=>void }) {
  const [loading,setLoading]=useState(false);
  return <button className="mapControl" title="Use my location" onClick={()=>{setLoading(true);navigator.geolocation?.getCurrentPosition(p=>{const x:[number,number]=[p.coords.latitude,p.coords.longitude];onLocate(x);setLoading(false)},()=>setLoading(false),{enableHighAccuracy:true,timeout:10000})}}>{loading?<RefreshCw className="spin"/>:<Crosshair/>}</button>;
}
function MapClick({ onPick }: { onPick:(p:LatLng)=>void }) { useMapEvents({click:e=>onPick([e.latlng.lat,e.latlng.lng])}); return null; }
const pin=(c:string)=>L.divIcon({className:'pin',html:`<span style="background:${c}"></span>`,iconSize:[26,34],iconAnchor:[13,32],popupAnchor:[0,-28]});
const startIcon=pin('#0b7a75'), endIcon=pin('#e04b4b');
async function geocode(q:string):Promise<Place[]> {
  const url=`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&countrycodes=in&addressdetails=1&q=${encodeURIComponent(q)}`;
  const r=await fetch(url,{headers:{'Accept-Language':'en-IN'}}); if(!r.ok) throw Error('Search failed'); return r.json();
}
async function route(a:LatLng,b:LatLng) {
  const url=`https://router.project-osrm.org/route/v1/driving/${a[1]},${a[0]};${b[1]},${b[0]}?overview=full&geometries=geojson&alternatives=true&steps=true`;
  const r=await fetch(url); if(!r.ok) throw Error('Routing failed'); const data=await r.json(); if(data.code!=='Ok'||!data.routes?.length) throw Error('No route found'); return data;
}
function App(){
  const online=useOnline(); const [s,setS]=useState<AppState>(load()); const [tab,setTab]=useState('navigate');
  const [fromQ,setFromQ]=useState(''),[toQ,setToQ]=useState(''); const [fromRes,setFromRes]=useState<Place[]>([]),[toRes,setToRes]=useState<Place[]>([]);
  const [busy,setBusy]=useState(''); const [err,setErr]=useState(''); const [menu,setMenu]=useState(false); const [voice,setVoice]=useState<MediaRecorder|null>(null); const [pois,setPois]=useState<any[]>([]); const [routeIndex,setRouteIndex]=useState(0); const [battery,setBattery]=useState<number|null>(null); const [tileError,setTileError]=useState(false);
  useEffect(()=>{ const ns={...s,offline:!online}; setS(ns); save(ns); },[online]);
  useEffect(()=>{ if(navigator.geolocation&&!s.originPos) navigator.geolocation.getCurrentPosition(p=>{const pos:[number,number]=[p.coords.latitude,p.coords.longitude];const ns={...s,originPos:pos,origin:'Current location'};setS(ns);save(ns)},()=>{}); },[]);
  useEffect(()=>{ const nav:any=navigator; if(nav.getBattery){nav.getBattery().then((b:any)=>{const update=()=>setBattery(Math.round(b.level*100));update();b.addEventListener('levelchange',update);return()=>b.removeEventListener('levelchange',update)}).catch(()=>{})}},[]);
  const center=s.originPos||[17.385,78.486] as LatLng;
  const routes=s.route?.routes||[]; const activeRoute=routes[routeIndex]||routes[0];
  const line=(activeRoute?.geometry?.coordinates||[]).map((x:number[])=>[x[1],x[0]] as LatLng);
  const allRouteLines=routes.map((r:any)=>(r.geometry?.coordinates||[]).map((x:number[])=>[x[1],x[0]] as LatLng));
  function update(ns:AppState){setS(ns);save(ns)}
  function setOrigin(pos:LatLng,label='Current location'){update({...s,originPos:pos,origin:label});setFromQ(label==='Current location'?'':label);setFromRes([]);}
  function swap(){
    const nextFrom=s.destination, nextTo=s.origin;
    update({...s,origin:nextFrom,destination:nextTo,originPos:s.destPos,destPos:s.originPos,route:null,pack:null});
    setFromQ(nextFrom==='Current location'?'':nextFrom);
    setToQ(nextTo==='Current location'?'':nextTo);
    setFromRes([]);setToRes([]);setRouteIndex(0);
  }
  async function search(which:'from'|'to'){setErr('');const q=which==='from'?fromQ:toQ;if(!q.trim())return;if(!online){setErr('Location search needs internet. Your saved Safety Pack still works offline.');return}try{const r=await geocode(q);which==='from'?setFromRes(r):setToRes(r);if(!r.length)setErr('No location found. Try a nearby landmark, area, city or full address.')}catch{setErr('Location search is temporarily unavailable. Check your internet connection.')}}
  function pick(p:Place,which:'from'|'to'){const pos=[+p.lat,+p.lon] as LatLng;update({...s,...which==='from'?{origin:p.display_name,originPos:pos}:{destination:p.display_name,destPos:pos}});if(which==='from'){setFromQ(p.display_name);setFromRes([])}else{setToQ(p.display_name);setToRes([])}}
  async function makeRoute(){
    setErr('');
    if(!online&&!s.route){
      setErr('Connect to the internet once to search locations and create a route.');
      return;
    }
    setBusy('route');
    try{
      let originPos=s.originPos;
      let destPos=s.destPos;
      let origin=s.origin;
      let destination=s.destination;

      // Allow users to type a place and press Get route without having to
      // click an autocomplete result first.
      if(!originPos){
        const q=fromQ.trim() || (origin && origin!=='Current location' ? origin : '');
        if(!q) throw Error('Choose a starting location first.');
        const results=await geocode(q);
        if(!results.length) throw Error('Starting location not found.');
        originPos=[+results[0].lat,+results[0].lon];
        origin=results[0].display_name;
        setFromQ(origin);
      }

      if(!destPos){
        const q=toQ.trim() || destination;
        if(!q) throw Error('Choose a destination first.');
        const results=await geocode(q);
        if(!results.length) throw Error('Destination not found.');
        destPos=[+results[0].lat,+results[0].lon];
        destination=results[0].display_name;
        setToQ(destination);
      }

      const r=await route(originPos,destPos);
      update({...s,origin,destination,originPos,destPos,route:r});
      setRouteIndex(0);
    }catch(e:any){
      const message=e?.message||'Could not calculate the route.';
      if(s.route && (!online || message==='Routing failed')){
        setErr('Network unavailable — showing your cached route.');
      }else{
        setErr(message==='No route found'?'No drivable route found between these locations. Try nearby places.':message);
      }
    }finally{
      setBusy('');
    }
  }
  function prepare(){if(!s.route){setErr('Create a route first.');return}const pack={created:new Date().toISOString(),origin:s.origin,destination:s.destination,route:s.route,pois:pois.map(x=>({id:x.id,name:x.tags?.name||x.tags?.amenity||'Safety location',lat:x.lat??x.center?.lat,lon:x.lon??x.center?.lon}))};update({...s,pack});setTab('journey')}
  function start(){if(!s.pack){setErr('Prepare the Safety Pack before starting.');setTab('navigate');return}if(!s.contact){setErr('Add an emergency contact before starting the journey.');setTab('safety');return}update({...s,journey:true});setTab('journey')}
  function simulateBlock(){update({...s,blocked:true});setErr('Road block simulated. The cached route remains available. A true regional offline A*/Dijkstra road graph requires a bundled road dataset; this prototype does not fake one.')}
  function toggleOffline(){update({...s,offline:!s.offline})}
  function emergency(){const e={id:crypto.randomUUID(),time:new Date().toISOString(),lat:s.originPos?.[0],lon:s.originPos?.[1],contact:s.contact,status:'PENDING SYNC',category:'Emergency'};update({...s,emergency:e});setTab('safety')}
  function recordVoice(){if(!('MediaRecorder'in window)){setErr('Voice recording is not supported by this browser.');return}if(voice){voice.stop();setVoice(null);return}navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{const rec=new MediaRecorder(stream);const chunks:BlobPart[]=[];rec.ondataavailable=e=>chunks.push(e.data);rec.onstop=()=>{stream.getTracks().forEach(t=>t.stop());const item={id:crypto.randomUUID(),time:new Date().toISOString(),status:'PENDING SYNC',size:chunks.reduce((n,c)=>n+(c as Blob).size,0)};update({...s,voiceQueue:[...s.voiceQueue,item]})};rec.start();setVoice(rec)}).catch(()=>setErr('Microphone permission was denied.'))}
  async function sync(){if(!online){setErr('Restore internet before syncing.');return}try{const items=[];if(s.emergency)items.push({type:'emergency',data:s.emergency});if(s.voiceQueue.length)items.push(...s.voiceQueue.map(x=>({type:'voice',data:x})));await fetch(API+'/sync/batch',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:{items}})});update({...s,emergency:s.emergency?{...s.emergency,status:'SYNCHRONIZED'}:null,voiceQueue:s.voiceQueue.map(x=>({...x,status:'SYNCHRONIZED'}))})}catch{setErr('Backend unavailable. Data remains queued locally.')}}
  async function nearby(){if(!s.originPos){setErr('Location is unavailable. Allow location access first.');return}const [lat,lon]=s.originPos;const q=`[out:json];(node[amenity~"hospital|police|fuel"](around:5000,${lat},${lon});way[amenity~"hospital|police|fuel"](around:5000,${lat},${lon}););out center tags;`;try{const r=await fetch('https://overpass-api.de/api/interpreter',{method:'POST',body:q});if(!r.ok)throw Error();const j=await r.json();setPois(j.elements.slice(0,30))}catch{setErr('Nearby safety data is unavailable right now. Your prepared/cached Safety Pack can still be used offline.')}}
  const status=s.offline?'OFFLINE MODE':'ONLINE';
  const mapPoints=[...(s.originPos?[s.originPos]:[]),...(s.destPos?[s.destPos]:[]),...line];
  return <div className="app">
    <header><div className="brand"><div className="logo"><Navigation/></div><div><b>RAAHI</b><span>Resilient travel safety</span></div></div><div className={`net ${s.offline?'off':'on'}`}>{s.offline?<WifiOff size={15}/>:<Wifi size={15}/>} {status}</div><button className="hamb" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
    <div className="shell"><aside className={menu?'open':''}><button onClick={()=>{setTab('navigate');setMenu(false)}} className={tab==='navigate'?'active':''}><Navigation/>Navigate</button><button onClick={()=>{setTab('journey');setMenu(false)}} className={tab==='journey'?'active':''}><ShieldCheck/>Journey</button><button onClick={()=>{setTab('safety');setMenu(false)}} className={tab==='safety'?'active':''}><Siren/>Safety</button><button onClick={()=>{setTab('connect');setMenu(false)}} className={tab==='connect'?'active':''}><Radio/>Connect</button><div className="sidefoot"><small>NAVIGATE · PROTECT · CONNECT</small><button onClick={toggleOffline}>{s.offline?'Restore connection':'Simulate offline'}</button></div></aside>
      <main>{err&&<div className="alert"><AlertTriangle size={17}/>{err}<button onClick={()=>setErr('')}>×</button></div>}
      {tab==='navigate'&&<><section className="hero"><div><p className="eyebrow">OFFLINE-FIRST SAFETY NAVIGATION</p><h1>Plan your route.<br/><em>Stay safe offline.</em></h1><p>Search any place, choose a route, prepare a Safety Pack and continue with saved journey data when the network disappears.</p></div><div className="heroStat"><ShieldCheck/><b>Safety Pack</b><span>{s.pack?'Ready offline':'Not prepared'}</span></div></section>
        <div className="mapCard"><div className="searchPanel">
          <div className="field"><MapPin/><input value={fromQ} onFocus={()=>{if(!fromQ && s.origin==='Current location') setFromQ('')}} onChange={e=>{setFromQ(e.target.value); if(e.target.value.trim()) update({...s,origin:e.target.value,originPos:null})}} onKeyDown={e=>e.key==='Enter'&&search('from')} placeholder={s.origin==='Current location'?'From location (currently using your location)':'From location'}/><button onClick={()=>search('from')} aria-label="Search starting location"><Search size={14}/></button></div>
          {s.origin==='Current location'&&!fromQ&&<div className="locationHint"><LocateFixed size={13}/> Using your current location as the starting point</div>}
          {fromRes.length>0&&<div className="results">{fromRes.map(p=><button key={p.lat+p.lon} onClick={()=>pick(p,'from')}>{p.display_name}</button>)}</div>}
          <button className="swap" onClick={swap}><ArrowRightLeft size={15}/> Swap</button>
          <div className="field"><MapPin/><input value={toQ} onChange={e=>{setToQ(e.target.value); if(e.target.value.trim()) update({...s,destination:e.target.value,destPos:null})}} onKeyDown={e=>e.key==='Enter'&&search('to')} placeholder="Where to?"/><button onClick={()=>search('to')} aria-label="Search destination"><Search size={14}/></button></div>
          {toRes.length>0&&<div className="results">{toRes.map(p=><button key={p.lat+p.lon} onClick={()=>pick(p,'to')}>{p.display_name}</button>)}</div>}
          <div className="actionRow"><button className="primary" onClick={makeRoute}>{busy==='route'?<RefreshCw className="spin"/>:<RouteIcon/>} {busy==='route'?'Finding route…':'Get route'}</button><button className="iconBtn" onClick={()=>setOrigin(center)} title="Use current location"><LocateFixed/></button></div>
          {routes.length>0&&<div className="routeChoices">{routes.slice(0,3).map((r:any,i:number)=><button key={i} className={routeIndex===i?'selected':''} onClick={()=>setRouteIndex(i)}><span><b>{Math.round(r.duration/60)} min</b><small>{(r.distance/1000).toFixed(1)} km · {i===0?'Recommended':'Alternative'}</small></span><ChevronRight/></button>)}</div>}
          {activeRoute&&<div className="routeMeta"><span><Clock/> {Math.round(activeRoute.duration/60)} min</span><span><RouteIcon/> {(activeRoute.distance/1000).toFixed(1)} km</span><small>{s.offline?'CACHED':'LIVE · OSRM'}</small></div>}
          {s.route&&<button className="secondary wide" onClick={prepare}><Download/> Prepare Safety Pack</button>}
        </div>
        {tileError&&<div className="tileWarning"><AlertTriangle size={15}/> Map tiles could not load. Check internet or tile access.</div>}
        <MapContainer center={center} zoom={12} className="map" scrollWheelZoom={true} zoomControl={true} preferCanvas={true}>
          <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" eventHandlers={{tileerror:()=>setTileError(true),tileload:()=>setTileError(false)}} />
          <Recenter pos={!s.route&&s.destPos?s.destPos:null}/><FitRoute points={mapPoints}/><LocateButton onLocate={p=>setOrigin(p)}/><MapClick onPick={p=>setOrigin(p,'Pinned location')}/>
          {s.originPos&&<Marker position={s.originPos} icon={startIcon}><Popup><b>From</b><br/>{s.origin}</Popup></Marker>}
          {s.destPos&&<Marker position={s.destPos} icon={endIcon}><Popup><b>Destination</b><br/>{s.destination}</Popup></Marker>}
          {allRouteLines.map((r:LatLng[],i:number)=><Polyline key={i} positions={r} pathOptions={{color:i===routeIndex?'#0b7a75':'#8aa6a1',weight:i===routeIndex?7:4,opacity:i===routeIndex?0.95:0.55,dashArray:i===routeIndex?undefined:'8 10'}}/>) }
        </MapContainer></div></>}
      {tab==='journey'&&<><section className="pageHead"><div><p className="eyebrow">JOURNEY MODE</p><h2>{s.journey?'Journey in progress':'Ready for your journey'}</h2><p>{s.journey?'Your prepared route stays available if connectivity drops.':'Prepare a Safety Pack and add an emergency contact before starting.'}</p></div>{s.journey&&<span className="pill good">● TRACKING</span>}</section><div className="journeyGrid"><div className="mapCard large"><MapContainer center={center} zoom={12} className="map"><TileLayer attribution='&copy; OpenStreetMap contributors' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"/><FitRoute points={mapPoints}/>{line.length>0&&<Polyline positions={line} pathOptions={{color:'#0b7a75',weight:7}}/>}{s.originPos&&<Marker position={s.originPos} icon={startIcon}/>} {s.destPos&&<Marker position={s.destPos} icon={endIcon}/>}</MapContainer><div className="mapBadge">{s.offline?<><WifiOff/> OFFLINE · LOCAL DATA</>:<><Wifi/> ONLINE</>}</div></div><div className="stack"><div className="panel"><h3>Safety Pack</h3><p>{s.pack?'Ready for offline use':'Not prepared yet'}</p><div className="statusRow"><CheckCircle/> {s.pack?'Route + journey data cached':'Go to Navigate to prepare'}</div></div><div className="panel"><h3>Road block</h3><p>Test local recovery during the demo.</p><button className="secondary wide" onClick={simulateBlock}>{s.blocked?'Blocked · recovery active':'Simulate road block'}</button></div><button className="danger wide" onClick={emergency}><Siren/> Emergency Mode</button>{!s.journey&&<button className="primary wide" onClick={start}>Start Journey <ChevronRight/></button>}</div></div></>}
      {tab==='safety'&&<><section className="pageHead"><div><p className="eyebrow">PROTECT</p><h2>Journey Guardian</h2><p>Set the person who should receive your emergency information before you start.</p></div>{battery!==null&&battery<=20&&<span className="pill low"><BatteryLow/> LOW BATTERY</span>}</section><div className="two"><div className="panel contact"><div className="iconCircle"><Phone/></div><h3>Emergency contact</h3><p>This number is stored locally for the journey. Actual delivery requires a communication path.</p><input value={s.contact} onChange={e=>update({...s,contact:e.target.value})} placeholder="Emergency phone number" inputMode="tel"/><small>Location shared with this contact only when an emergency event is created and communication is available.</small></div><div className="panel"><div className="iconCircle"><Hospital/></div><h3>Nearby Safety</h3><p>Find real OpenStreetMap safety locations around your current position.</p><button className="secondary wide" onClick={nearby}><Hospital/> Find hospitals, police & fuel</button><div className="poiList">{pois.map((x:any,i)=><div key={x.id||i}>{x.tags?.amenity==='hospital'?<Hospital/>:x.tags?.amenity==='fuel'?<Fuel/>:<Building2/>}<span><b>{x.tags?.name||x.tags?.amenity||'Safety location'}</b><small>OpenStreetMap · locally viewed</small></span></div>)}</div></div></div>{s.emergency&&<div className="emergencyBox"><Siren/><div><b>Emergency event prepared</b><span>{s.emergency.status}</span><small>Location: {s.emergency.lat?.toFixed?.(5)}, {s.emergency.lon?.toFixed?.(5)}</small></div></div>}</>}
      {tab==='connect'&&<><section className="pageHead"><div><p className="eyebrow">CONNECT</p><h2>Emergency communication</h2><p>Queue voice and emergency data locally, then synchronize when a real communication path returns.</p></div></section><div className="connectGrid"><div className="panel voice"><div className="bigIcon"><Mic/></div><h3>{voice?'Recording…':'Voice emergency message'}</h3><p>{voice?'Tap again to stop recording.':'Your voice message is queued locally if the network is unavailable.'}</p><button className={voice?'danger':'primary'} onClick={recordVoice}>{voice?'Stop recording':'Record voice message'}</button><div className="queue">{s.voiceQueue.map((x:any)=><div key={x.id}><Mic/><span><b>Voice message</b><small>{x.status} · {Math.ceil((x.size||0)/1024)} KB</small></span></div>)}</div></div><div className="panel"><div className="bigIcon"><Radio/></div><h3>Store-and-forward relay</h3><p>Prototype of the resilience concept. This browser demo does not claim real Bluetooth mesh networking.</p><div className="relay"><span className="dot"></span> Relay simulation ready<div>Nearby RAAHI users could exchange queued packets through a supported device-to-device transport.</div></div><button className="secondary wide" onClick={()=>update({...s,relay:true})}>{s.relay?'Relay packet simulated':'Simulate relay packet'}</button><button className="primary sync" onClick={sync}><RefreshCw/> Synchronize pending data</button></div></div></>}
      <footer>RAAHI uses OpenStreetMap data for mapping and routing services. It is a resilience layer, not a replacement for official emergency services.</footer></main></div></div>
}
createRoot(document.getElementById('root')!).render(<App/>);
