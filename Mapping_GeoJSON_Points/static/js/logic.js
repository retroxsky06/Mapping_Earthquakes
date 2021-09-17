// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center of the earth. and zoom level.
let map = L.map('mapid').setView([30, 30], 2);

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}},
]};

// GeoJSON objects are added to the map through a GeoJSON layer
// Grabbing our GeoJSON data.
L.geoJson(sanFranAirport, {
    onEachFeature: function(feature, layer) {
    // We turn each feature into a marker on the map.
    // pointToLayer: function(feature, latlng) {
        console.log(layer);
        layer.bindPopup("<h3>Airport code: " + feature.properties.faa + "</h3>");
    }
}).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Accessing the airport GeoJSON URL.
let airportData = "https://raw.githubusercontent.com/retroxsky06/Mapping_Earthquakes/main/majorAirports.json"

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data. Adds the popup!
  // L.geoJson(data).addTo(map);
  L.geoJson(data)
    .bindPopup("<b>" + "Airport code: " + data.features[0].properties.faa + "<hr>" + "Airport name: " + data.features[0].properties.name + "</b>")
    .addTo(map);
})
// Add our 'graymap' tile layer to the map.
streets.addTo(map);


