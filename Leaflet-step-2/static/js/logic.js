function show() {

    // blank out map so it can be replace if needed.
    var container = L.DomUtil.get('map'); if(container != null){ container._leaflet_id = null; }

    // Store our API endpoint inside queryUrl & platesURL
    var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"; 
    var platesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

    // layers for two different sets of data, i.e. earthquakes and tectonicplates.
    var tectonicplates = new L.LayerGroup();
    var earthquakes = new L.LayerGroup();

    // Dark background
    var graymap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18, 
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
    });
    
    // satellite background
    var satellitemap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18, 
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
    }); 

    // outdoor background
    var outdoormap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18, 
    id: 'mapbox/outdoors-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
    });

    // Create our map
    var myMap = L.map("map").setView([37.09, -95.71], 4, [satellitemap, earthquakes]);
  
    // var myMap = L.map("map", {
    //     center: [
    //       37.09, -95.71
    //     ],
    //     zoom: 4,
    //     layers: [satellitemap, earthquakes]
    //     });

    // base layers
    var baseMaps = {
    'Satellite': satellitemap,
    'Grayscale': graymap,
    'Outdoors': outdoormap
  };
  
    // overlays 
    var overlayMaps = {
        "Fault Lines": tectonicplates,
        "Earthquakes": earthquakes
    };

    // control which layers are visible.
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

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
                     layer.bindPopup("<h3>" + feature.properties.place +
                 "</h3><hr><h3>" + feature.properties.mag + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
                 }
                 
            // Add earthquakeData to earthquakes LayerGroups 
                }).addTo(earthquakes);
                // Add earthquakes Layer to the Map
                earthquakes.addTo(myMap);
            
            // Retrieve platesURL (Tectonic Plates GeoJSON Data) with D3
            d3.json(platesURL, function(plateData) {
                // Create a GeoJSON Layer the plateData
                L.geoJson(plateData, {
                    color: "#DC143C",
                    weight: 2
                // Add plateData to tectonicPlates LayerGroups 
                }).addTo(tectonicplates);
                // Add tectonicPlates Layer to the Map
                tectonicplates.addTo(myMap);
            });
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