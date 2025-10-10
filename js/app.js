// Gustos disponibles
const GUSTOS = ["comida","naturaleza","arte","café","historia"];

// Chips UI
const chipsWrap = document.getElementById("chips");
const stored = JSON.parse(localStorage.getItem("gustos")||"[]");
GUSTOS.forEach(g=>{
  const el=document.createElement("button");
  el.className="chip"+(stored.includes(g)?" active":"");
  el.textContent=g;
  el.onclick=()=>{
    el.classList.toggle("active");
    saveGustos();
  };
  chipsWrap.appendChild(el);
});
function getGustosSel(){
  return [...document.querySelectorAll(".chip.active")].map(el=>el.textContent);
}
function saveGustos(){
  localStorage.setItem("gustos", JSON.stringify(getGustosSel()));
}

// Mapa
const map = L.map("map");
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  { attribution:"© OpenStreetMap"}).addTo(map);
map.setView([19.4326,-99.1332], 12);

// Ubicación del usuario
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(p=>{
    const {latitude,longitude}=p.coords;
    map.setView([latitude,longitude], 13);
    L.circle([latitude,longitude],{radius:30,color:"#22c55e"}).addTo(map).bindPopup("Estás aquí");
  });
}

const markers = [];
function iconByTag(tags){
  const main=(tags.find(t=>GUSTOS.includes(t))||"comida");
  const colors={comida:"#ef4444",naturaleza:"#22c55e",arte:"#a855f7","café":"#f59e0b",historia:"#3b82f6"};
  const color=colors[main]||"#ef4444";
  const svg=encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='36' viewBox='0 0 24 36'>
       <path d='M12 0C5.4 0 0 5.2 0 11.6 0 20.3 12 36 12 36s12-15.7 12-24.4C24 5.2 18.6 0 12 0z' fill='${color}'/>
       <circle cx='12' cy='12' r='5' fill='white'/>
     </svg>`
  );
  return L.icon({iconUrl:`data:image/svg+xml,${svg}`,iconSize:[24,36],iconAnchor:[12,36],popupAnchor:[0,-30]});
}
function renderMarkers(list){
  markers.forEach(m=>map.removeLayer(m));
  markers.length=0;
  list.forEach(p=>{
    const m=L.marker([p.lat,p.lng],{icon:iconByTag(p.tags)}).addTo(map);
    m.bindPopup(`<b>${p.nombre}</b><br>${p.desc||""}<br><i>${p.tags.join(", ")}</i>`);
    markers.push(m);
  });
}

// Cargar datos y conectar filtros
let PLACES=[];
fetch("/data/places.json")
  .then(r=>r.json())
  .then(data=>{
    PLACES=data;
    renderMarkers(PLACES);
    fitToMarkers();
  });

function fitToMarkers(){
  if(!markers.length) return;
  const g=L.featureGroup(markers);
  map.fitBounds(g.getBounds().pad(0.2));
}

// Radio
const rInput=document.getElementById("radio");
const rVal=document.getElementById("rVal");
rInput.oninput=()=>rVal.textContent=rInput.value;

function haversine(lat1,lon1,lat2,lon2){
  const R=6371, dLat=(lat2-lat1)*Math.PI/180, dLon=(lon2-lon1)*Math.PI/180;
  const a=Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return 2*R*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}

function filtrar(){
  const gustos=getGustosSel();
  const km=Number(rInput.value);
  const c=map.getCenter();
  const out=PLACES.filter(p=>{
    const okTag=!gustos.length || p.tags.some(t=>gustos.includes(t));
    const d=haversine(c.lat,c.lng,p.lat,p.lng);
    return okTag && d<=km;
  });
  renderMarkers(out);
  fitToMarkers();
}
document.getElementById("btnFiltrar").onclick=filtrar;
document.getElementById("btnTodos").onclick=()=>{
  renderMarkers(PLACES);
  fitToMarkers();
};
