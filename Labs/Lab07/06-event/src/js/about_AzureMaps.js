const regeneratorRuntime = require("regenerator-runtime"); // used by Babel

import './general';
// import * as atlas from 'azure-maps-control'; // not using this, using the CDN instead


// this function gets called to draw the map on the page
async function initMap() {
  const position = new atlas.data.Position(-122.980356, 44.006876);  // Mt. Pisgah Arboretum

  // Create an Azure Maps map
  const map = new atlas.Map('map', {
    center: position,
    zoom: 12,
    authOptions: {
      // Replace with your Azure Maps subscription key
      authType: 'subscriptionKey',
      subscriptionKey: AMAP_KEY
    }
  });

  // Wait for the map to load
  map.events.addOnce('ready', () => {
    // Add a marker to the map at the specified position
    const marker = new atlas.HtmlMarker({
      position: position,
      htmlContent: `<svg height="50" width="30">
      <circle cx="15" cy="15" r="10" stroke="black" stroke-width="2" fill="red" />
      <path d="M 15 25 Q 15 35 15 45" stroke="black" stroke-width="2" fill="transparent" />
    </svg>`
    });

    // Create a popup and set its content to the name and address of the location
    const popup = new atlas.Popup({
      content: '<div style="padding:10px"><h3>Mt. Pisgah Arboretum</h3><p>34901 Frank Parrish Rd, Eugene, OR 97405</p></div>',
      position: position,
      pixelOffset: new atlas.Pixel(0, -40) // Adjust the position of the popup
    });

    // Add the marker and the popup to the map
    map.markers.add(marker);
    map.popups.add(popup);

    // Open the popup
    popup.open();

  });
}

// Load the map and navbar when the page loads
window.addEventListener("load", () => {
  initMap();
});
