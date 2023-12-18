// Globally declared so that they can be accessed anywhere
var map; // Map that the user interacts with
var renderer; // Object that renders directions to the map
var requester; // Object that performs route requests with API

// Initializes the map that the user will interact with
function initMap() {

    // If these were normal packages they would have to be imported, but since we are using the google maps
    // api, google.maps allows us to access them. We can now use Map and Marker constructors

    const Map = google.maps.Map;
    const Position = google.maps.LatLng;
    const Data = google.maps.Data;
    const DirectionRenderer = google.maps.DirectionsRenderer;
    const Polyline = google.maps.Polyline; // SHould be deleted after messing around with this class

    //"const position = { lat: 42.29165454345918, lng: -85.58650989019559 };"

    // Position of approx the center of the US
    var position = new google.maps.LatLng(40.56225001882818, -97.48801983958008);

    // The map, centered at Kalamazoo. Created using our new Map constructor
    map = new Map(document.getElementById("map"), {
        zoom: 4,
        center: position,
        mapId: "DEMO_MAP_ID",
    });

    // renderer and requester should be defined as this before any other methods are executed
    renderer = new google.maps.DirectionsRenderer();
    renderer.setMap(map);

    requester = new google.maps.DirectionsService();

    // A line between two random places in Michigan. Will this be how I create my routes?
    var testLine = new google.maps.Polyline({
        map: map,
        path: [new google.maps.LatLng(42.916558725651875, -86.04898509501048),
        new google.maps.LatLng(42.720259057210995, -85.41985878872258)]
    });
}

// Changes the map when the route fields are changed
function handleRouteFieldChange() {
    // This is bad practice since this method can only be used with these elements. How to fix?
    var omnibox1 = document.getElementById("omnibox1");
    var omnibox2 = document.getElementById("omnibox2");

    // If the inputs aren't empty create a new route request between them 

    if (omnibox1.value != "" && omnibox2.value != "") {
        var request = {
            origin: omnibox1.value,
            destination: omnibox2.value,
            travelMode: "DRIVING",
            waypoints: [{ location: 'Otsego, MI' }] // All generated routes will go through Otsego
        }

        // Create new route w/ direction fields
        requester.route(request, function (response, status) {
            if (status === 'OK') {
                // This will eventually be replaced with returing the route, it's like this 
                // for now for testing purposes
                renderer.setDirections(response);
            }
            else
                throw new Error('Something went wrong with a route request');
        })
    }
}

// !!!Not Finished!!! Generates routes based on given parameters   
function beginRouteGeneration() {
    return true;
}

// Clears the active routes from the map
function clearRoutes() {
    renderer.setDirections({ routes: [] })
}