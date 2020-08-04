const API_KEY = "pk.eyJ1IjoiYmFqd2FqIiwiYSI6ImNrYjlxZTVmMjBnb2gydG52dXgwbHF3dDUifQ.UnUKllvKhXuoobQA5qkSpg";


// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Create the map with our layers
var map = L.map("map", {
    center: [40.73, -74.0059],
    zoom: 3,
  });

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);


// Use this link to get the geojson data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

function styleinfo (feature) {
    return {
      color: "white",
      fillColor: chooseColor(feature.properties.mag),
      fillOpacity: 0.5,
      weight: 1.5,
      radius: getRadius(feature.properties.mag)
    }}

    function chooseColor (magnitude) {
        switch (true) {
            case magnitude > 5:
              return "yellow";
            case magnitude > 4:
              return "red";
            case magnitude > 3:
              return "orange";
            case magnitude > 2:
              return "green";
            case magnitude > 1:
              return "purple";
            default:
              return "black";
            }
    }

    function getRadius (magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    };

// Grabbing our GeoJSON data..
d3.json(link, function(data){

  

    L.geoJson(data, {
        // Style each feature (in this case a magnitude)
        style: styleinfo,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng)
        },
    
        // Called on each feature
        onEachFeature: function(feature, layer) {
      
          // Giving each feature a pop-up with information pertinent to it
          layer.bindPopup("Magnitude: " +feature.properties.mag +"<br> Location: " +feature.properties.place);
    
        }
    
      }).addTo(map);
    
    });