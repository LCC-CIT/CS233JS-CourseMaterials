<h1>Azure Maps Code for the Events App Lab</h1>

This is the code I used in my solution for the about page in the Events App. The code is all in one function,`initMap()` , which needs to be called when the web page loads. This will put a map on the web page with a pin marking a location and a pop-up describing the marked location.

```javascript
// this function gets called to draw the map on the page
async function initMap() {
  // position is for Mt. Pisgah Arboretum
  const position = new atlas.data.Position(-122.980356, 44.006876);  

  // Create an Azure Maps map
  const map = new atlas.Map('map', {
    center: position,
    zoom: 12,
    authOptions: {
       authType: 'subscriptionKey',
      subscriptionKey: AMAP_KEY  // Your subscription key from .env
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
      content: '<div style="padding:10px">
					<h3>Mt. Pisgah Arboretum</h3>
					<p>34901 Frank Parrish Rd, Eugene, OR 97405</p>
				</div>',
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
```



By Brian Bird, spring <time>2024</time>, based on code from [Azure maps documentation](https://learn.microsoft.com/en-us/azure/azure-maps/?source=recommendations).