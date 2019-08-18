// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    startWatch();
    
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})

function shake(){
    navigator.vibrate(3000);
}
//accCallback. this the function in chage of
//displayiing the acceleration on the front end
function accCallback(acceleration){
    var element = document.getElementById('accelerometer');
    element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br>' +
                        'Acceleration Y: ' + acceleration.y + '<br>' +
                        'Acceleration Z: ' + acceleration.z + '<br>' +
                        'Timestamp: ' + acceleration.timestamp + '<br>';
    }
    
//oneError callback
function onError(msg){
    console.log(msg);
    alert(msg);
}
//json object
var options = {
    frequency: 3000
    };
    

// this is the function that will read the accelerometer
var watchID = null;
function startWatch(){
    //notice that the function takes two callsbacks (acccallback and onerrror ) and JSON object (obtions)
    watchID = navigator.accelerometer.watchAcceleration(accCallback, onError, options);
}


// onSuccess Callback
//
var geoCallback2 = function(position) {
    var element2 = document.getElementById('position');
    element2.innerHTML ='Latitude: '          + position.coords.latitude          + '\n' +
                        'Longitude: '         + position.coords.longitude         + '\n' +
                        'Altitude: '          + position.coords.altitude          + '\n' +
                        'Accuracy: '          + position.coords.accuracy          + '\n' +
                        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                        'Heading: '           + position.coords.heading           + '\n' +
                        'Speed: '             + position.coords.speed             + '\n' +
                        'Timestamp: '         + new Date(position.timestamp)      + '\n';
}

// onSuccess Callback
//
var geoCallback = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + new Date(position.timestamp)      + '\n');
};


function geolocation(){
    watchID2 = navigator.geolocation.getCurrentPosition(geoCallback, onError);
}

