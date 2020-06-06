function show() {

    // blank out map so it can be replace if needed.
    var container = L.DomUtil.get('map'); if(container != null){ container._leaflet_id = null; };

    // Store our API endpoint inside queryUrl
    var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
    
    // Create our map
    // var myMap = L.map("map").setView([37.09, -95.71], 4);
  
    var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    });

    // Add a tile layer (the background map image) to our map
    // Use the addTo method to add objects to our map
    var streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18, 
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
  });

    streetmap.addTo(myMap);     
    // Perform a GET request to the query URL
    d3.json(queryUrl, function(data) {
        console.log(data.features);
        // create a styleData function
        function styleData(feature){
            return {
                 radius: getRadius(feature.properties.mag),
                 fillColor: getColor(feature.properties.mag),
                 color: "#000",
                 weight: 1,
                 opacity: 1,
                 fillOpacity: 0.8
            }
             };
             // getcolor function to be used for markers & legends
             function getColor(magnitude) {
                     if (magnitude < 1) {
                     return "#ccff33"
                     }
                     else if (magnitude < 2) {
                     return "#ffff33"
                     }
                     else if (magnitude < 3) {
                     return "#ffcc33"
                     }
                     else if (magnitude < 4) {
                     return "#ff9933"
                     }
                     else if (magnitude < 5) {
                     return "#ff6633"
                     }
                     else {
                     return "#ff3333"
                     }
                 }
             // getRadius function to be used for marker size    
             function getRadius (magnitude){
                 return magnitude * 4
             };
             // Create a GeoJSON layer containing the features array on the earthquakeData object
             // Run the onEachFeature function once for each piece of data in the array
             L.geoJSON(data, {
                 pointToLayer: function (feature, latlng) {
                     return L.circleMarker(latlng);
                 }, 
                 style: styleData,
                 onEachFeature : function(feature, layer){
                     layer.bindPopup("<h3 style= text-align: center;>" + feature.properties.place +
                 "</h3><hr><h3 style= text-align: center;>" + feature.properties.mag + "</h3><hr><p style= text-align: center;>" + new Date(feature.properties.time) + "</p>");
                 }
                 
             }).addTo(myMap);

             // Add legend to the map
             var legend = L.control({position: 'bottomright'});
         
             legend.onAdd = function (map) {
         
             var div = L.DomUtil.create('div', 'info legend'),
                 grades = [0, 1,2,3,4,5];
         
             // loop through our density intervals and generate a label with a colored square for each interval
             for (var i = 0; i < grades.length; i++) {
                 div.innerHTML +=
                     '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                     grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
             }
             return div;
            };
         // Add legends to the map
         legend.addTo(myMap);
    });

}

show();