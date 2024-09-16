const socket = new WebSocket('ws://' + window.location.host + '/ws/stream/');
// Initialize the map and set the view to a default location
var map = L.map('map').setView([51.505, -0.09], 13);

// Define the OpenStreetMap layer
var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
});

// Define the ESRI Satellite layer
var satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// Add the OSM layer by default
osmLayer.addTo(map);

// Add layer controls to switch between layers
var baseMaps = {
    "OpenStreetMap": osmLayer,
    "Satellite": satelliteLayer
};
L.control.layers(baseMaps).addTo(map);

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    const message = data.message;
    const jsonObject = JSON.parse(message);
    addMarkers(jsonObject.places);
};

function searchLocation() {
    var location = document.getElementById('search').value;

    if (location) {
        // Send the search query to the WebSocket server
        socket.send(JSON.stringify({ type: 'search', query: location }));
    } else {
        alert('Please enter a location to search.');
    }
}

const markersLayer = L.layerGroup().addTo(map);

// Function to fetch coordinates and add markers
function addMarkers(places) {
    // Clear existing markers
    markersLayer.clearLayers();
    
    places.forEach(place => {
        // Fetch coordinates using Nominatim API
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place.place)}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    // Get the first result's latitude and longitude
                    const lat = data[0].lat;
                    const lon = data[0].lon;
                    // Set the map view to the searched location
                    map.setView([lat, lon], 13);
                    // Add a marker to the location
                    L.marker([lat, lon]).addTo(markersLayer)
                        .bindPopup(`<h1>${place.place}</h1><br>${place.description}`)
                        .openPopup();
                }
            })
            .catch(error => console.error('Error fetching location:', error));
    });
}


