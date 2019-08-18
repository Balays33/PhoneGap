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

/*
function geoCallback(position){
    console.log('position');
    var element =document.getElementById(geolocation);
    element.innerHTML = 'Latitude: '            + position.coords.latitude          + '<br />' +
                        'Longitude: '           + position.coords.longitude         + '<br />' +
                        'Altitude: '            + position.coords.altitude          + '<br />' + 
                        'Accuracy: '            + position.coords.accuracy          + '<br />' +
                        'Altitude Accuracy: '   + position.coords.altitudeAccuracy  + '<br />' +
                        'Heading: '             + position.coords.heading           + '<br />' +
                        'Speed: '               + position.coords.speed             + '<br />' +
                        'Timestamp: '           + new Date(position.timestamp)                 + '<br />';

    

}

function onError(message){
    console.log(message);
}

function getlocation(){
    navigator.geolocation.getCurrentPosition(geoCallback, onError)
}
*/



function onError(msg) {
    console.log(msg);
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(geoCallback, onError);
}

function geoCallback(position) {
    console.log(position);

    var element =document.getElementById('position');
    element.innerHTML = 'Latitude: '            + position.coords.latitude          + '<br />' +
                        'Longitude: '           + position.coords.longitude         + '<br />' +
                        'Altitude: '            + position.coords.altitude          + '<br />' + 
                        'Accuracy: '            + position.coords.accuracy          + '<br />' +
                        'Altitude Accuracy: '   + position.coords.altitudeAccuracy  + '<br />' +
                        'Heading: '             + position.coords.heading           + '<br />' +
                        'Speed: '               + position.coords.speed             + '<br />' +
                        'Timestamp: '           + new Date(position.timestamp)                 + '<br />';
}

function getTime(){
    
    var d = new Date();
    document.getElementById("demo").innerHTML = d;
    console.log(d);
}


function newway(){


    var http = new XMLHttpRequest();
    const url = 'https://api.darksky.net/forecast/3ad7f8e54c6fdcafbe0dfa539a9ae18c/53.4052439,-6.2996871';
  
    http.open("GET", url);
    http.send();
  
    http.onreadystatechange = (e) => {
          
      // First, I'm extracting the reponse from the 
      // http object in text format
      var response = http.responseText;
  
      // As we know that answer is a JSON object,
      // we can parse it and handle it as such
      var responseJSON = JSON.parse(response); 
  
      // Printing the result JSON to the console
      console.log(responseJSON);
      var temp = responseJSON.daily.summary;
      console.log(temp);
  
      
      document.getElementById('tempi').innerHTML = temp;
  }
}
