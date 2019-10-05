    // Create our map, giving it the satellitemap and earthquakes layers to display on load
    // var myMap = L.map("map", {
    //   center: [
    //     37.09, -95.71
    //   ],
    //   zoom:3,
    //   layers: [satellitemap, earthquakes]
    // });


    function createMap(earthquakes) {
      var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom:3,
      layers: [satellitemap, earthquakes]
    });

      // Define streetmap and darkmap layers
      var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: API_KEY
      });
    
      var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
      });
  
      var outdoormap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
          attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
          maxZoom: 18,
          id: "mapbox.outdoors",
          accessToken: API_KEY
        });
    
      // Define a baseMaps object to hold our base layers
      var baseMaps = {
        "Satellite": satellitemap,
        "Grayscale": graymap,
        "Outdoors": outdoormap
      };
    
      // Create overlay object to hold our overlay layer
      var overlayMaps = {
        Earthquakes: earthquakes
      };
  
      // Create a layer control
      // Pass in our baseMaps and overlayMaps
      // Add the layer control to the map
      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);
         // Create our map, giving it the satellitemap and earthquakes layers to display on load

    }
 // Define a markerSize function that will give each city a different radius based on its population
function markerSize(mag) {
  return mag;
}
function getColor(d) {
	return d > 5  ? '#BD0026' :
	       d > 4  ? '#E31A1C' :
	       d > 3  ? '#FC4E2A' :
	       d > 2   ? '#FD8D3C' :
	       d > 1   ? '#FEB24C' :
	       d > 0   ? '#FED976' :
	                  '#FFEDA0';
}
// Store our API endpoint inside queryUrl
var queryUrl= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
  });
  // console.log(data);
  function createFeatures(earthquakeData) {
 
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    // function onEachFeature(feature, layer) {
    //   layer.bindPopup("<h3>" + feature.properties.place +
    //     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    // }
    for (var i = 0; i < earthquakeData.length; i++) {
        L.circle(earthquakeData[i].geometry.coordinates, {
          fillOpacity: 0.75,
          color: "white",
          fillColor: "purple",
          // Setting our circle's radius equal to the output of our markerSize function
          // This will make our marker's size proportionate to its population
          radius: markerSize(earthquakeData[i].properties.mag)
        }).bindPopup("<h1>" + earthquakeData[i].properties.place + "</h1> <hr> <h3>Magnitude: " + earthquakeData[i].properties.mag + "</h3>").addTo(myMap);
      }
      
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    });
  
    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
  }
  

