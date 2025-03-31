import './general';

// about.js

function loadGoogleMaps() {
  (g => { 
    var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; 
    b = b[c] || (b[c] = {}); 
    var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, 
    u = () => h || (h = new Promise(async (f, n) => { 
      await (a = m.createElement("script")); 
      e.set("libraries", [...r] + ""); 
      for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); 
      e.set("callback", c + ".maps." + q); 
      a.src = `https://maps.${c}apis.com/maps/api/js?` + e; 
      d[q] = f; 
      a.onerror = () => h = n(Error(p + " could not load.")); 
      a.nonce = m.querySelector("script[nonce]")?.nonce || ""; 
      m.head.append(a) 
    })); 
    d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)) 
  })({
    key: GMAP_KEY,
    v: "quarterly"
  });
}

// this function gets called to draw the map on the page
async function initMap() {

  const position = { lat: 44.006876, lng: -122.980356 };  // Mt. Pisgah Arboretum
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered on the Mt. Pisgah Arboretum
  let map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: position,
    mapId: "1"
  });

  // The marker, positioned at Mt. Pisgah Arboretum
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Mt. Pisgah Arboretum"
  });

  // put some useful info about the event here
  // Mt. pisgah arboretum address: 34901 Frank Parrish Rd, Eugene, OR 97405
  const infowindow = new google.maps.InfoWindow({
    content: `<h3>${marker.title}</h3><p>34901 Frank Parrish Rd, Eugene, OR 97405</p>`
  });
  infowindow.open(map, marker);
}


// Load the map when the page loads
window.addEventListener("load", () => {
  loadGoogleMaps();
  initMap();
});
