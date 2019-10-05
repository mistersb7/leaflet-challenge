var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom:3
  // layers:[satellitemap,graymap,outdoormap]
  // // layers: [satellitemap, earthquakes]
});

var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
}).addTo(myMap);

var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(myMap);

var outdoormap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: API_KEY
  }).addTo(myMap);
// var myMap = L.map("map", {
//     center: [
//       37.09, -95.71
//     ],
//     zoom:3,
//     layers:[satellitemap,graymap,outdoormap]
//     // layers: [satellitemap, earthquakes]
//   });
// // Define a baseMaps object to hold our base layers
//      var baseMaps = {
//       "Satellite": satellitemap,
//       "Grayscale": graymap,
//       "Outdoors": outdoormap
//     };
//     // Create overlay object to hold our overlay layer
//     var overlayMaps = {
//       Earthquakes: earthquakes
//     };

//   // Add the layer control to the map
//       L.control.layers(baseMaps, overlayMaps, {
//         collapsed: false
//       }).addTo(myMap);


var queryUrl= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
    console.log(data);
  });

    function markerSize(mag) {
        return mag * 5;
      }   
      function getColor(d) {
        return d > 5  ? '#fc0303' :
               d > 4  ? '#fc8403' :
               d > 3  ? '#fcad03' :
               d > 2  ? '#fcdb03' :
               d > 1  ? '#e7fc03' :
               d > 0  ? '#a9fc03' :
                          '#6ffc03';
      } 

  function createFeatures(earthquakeData) {
 

    for (var i = 0; i < earthquakeData.length; i++) {

      var coordinates =earthquakeData[i].geometry.coordinates.slice(0,2);
      var cordinates= [coordinates[1],coordinates[0]];
        L.circleMarker(cordinates, {
          fillOpacity: 1,
          color: "black",
          weight: 1,
          fillColor: getColor(earthquakeData[i].properties.mag),
          // Setting our circle's radius equal to the output of our markerSize function
          // This will make our marker's size proportionate to its population
          radius: markerSize(earthquakeData[i].properties.mag)
        }).bindPopup("<h1>" + earthquakeData[i].properties.place + "</h1> <hr> <h3>Magnitude: " + earthquakeData[i].properties.mag + "</h3>").addTo(myMap);
      }
// Add legend information
var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1,2,3,4,5],
        labels = [];
// limits.forEach(function(limit, index) {
//       labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//     });
    //Create a loop o go through the density intervals and generate labels
    for (var i = 0; i < grades.length; i++)
    {
      div.innerHTML +=
        '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    console.log('div' + div);
  return div;
};
legend.addTo(myMap);
    // // Create a GeoJSON layer containing the features array on the earthquakeData object
    // // Run the onEachFeature function once for each piece of data in the array
    // var earthquakes = L.geoJSON(earthquakeData, {
    //   onEachFeature: onEachFeature
    // });
  
    // // Sending our earthquakes layer to the createMap function
    // createMap(earthquakes);
   
  }