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

function takePics(){
    navigator.camera.getPicture(cameraCallback, onError);
}

function cameraCallback(imageData){
    var image = document.getElementById('cameraPicture');
    image.src = imageData;

}

function onError(msg){
    console.log(msg);
}

// geolocation

// global variable
var longitude;
var latitude;
function  getLocation(){
    navigator.geolocation.getCurrentPosition(geoCallback, onError);
}

function geoCallback (position){
    var element = document.getElementById('gpslocation');
    element.innerHTML = 'Longitude: ' + position.coords.longitude + '<br>' +
                        'Latitude: ' + position.coords.latitude + '<br>' +
                        'Timestamp ' + position.timestamp + '<br>';
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;

}

function initMap() {
    var cct = {lat: 53.346, lng: -6.2588};
    var map = new google.maps.Map(document.getElementById('map'),
   { zoom: 12,
    center: cct
    }
    );
    var marker = new google.maps.Marker({
    position: cct,
    map: map
    }); 
    var otherloc = {lat: 53.3458, lng: -6.2575};
    var marker2 = new google.maps.Marker({
        position: otherloc,
        map: map
    })
    var home = {lat: latitude, lng: longitude};
    var marker3 = new google.maps.Marker({
        position: home,
        map: map
    })
}

// get your location country city data and currency

function openCage(){
    var http = new XMLHttpRequest();
    const url = 'https://api.opencagedata.com/geocode/v1/json?q=53.346+-6.2588&key=b95ccb4da5784bfca72b01a6b2af690f';
    http.open("GET", url);
    http.send();
    http.onreadystatechange = (e) => {
        var response = http.responseText;
        var responseJSON = JSON.parse(response);

        console.log(responseJSON);

        var city = responseJSON.results[0].components.city;
        var country = responseJSON.results[0].components.country;
        var currency = responseJSON.results[0].annotations.currency.name;

        document.getElementById('getlocatinonC').innerHTML = "Country: " + country + "<br>City: " + city + "<br>Currency: " + currency;
        }
    }
function exchange(){
    var http = new XMLHttpRequest();
    //const url = 'http://apilayer.net/api/live?access_key=310ff77de7a824ad7b6774e18cf4e29e';
    const url = 'http://apilayer.net/api/live?access_key=310ff77de7a824ad7b6774e18cf4e29e&currencies=EUR&source=USD&format=1';
    http.open("GET", url);
    http.send();
    http.onreadystatechange = (e) => {
        var response = http.responseText;
        var responseJSON = JSON.parse(response);

        console.log(responseJSON);
    var euro = responseJSON.quotes.USDEUR;
    console.log(euro);
    document.getElementById('euro').innerHTML = euro;
        var usd = document.getElementById('usd').value;
    var result = usd * euro;
    document.getElementById('ertek').innerHTML= result;
    }

}

////   Storing files in the phone

function tryingFile(){

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,fileSystemCallback, onError);
    //document.addEventListener("deviceready", function() { 
      //  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);
      //}, false);
}

function fileSystemCallback(fs){

    // Name of the file I want to create
    var fileToCreate = "newPersistentFile.txt";

    // Opening/creating the file
    fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);
}

var fileSystemOptionals = { create: true, exclusive: false };

function getFileCallback(fileEntry){
    
    var dataObj = new Blob(['Hello world'], { type: 'text/plain' });
    // Now decide what to do
    // Write to the file
    writeFile(fileEntry, dataObj);

    // Or read the file
    readFile(fileEntry);
}

// Let's write some files
function writeFile(fileEntry, dataObj) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['Hello'], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

    });
}

// Let's read some files
function readFile(fileEntry) {

    // Get the file from the file entry
    fileEntry.file(function (file) {
        
        // Create the reader
        var reader = new FileReader();
        reader.readAsText(file);

        reader.onloadend = function() {

            console.log("Successful file read: " + this.result);
            console.log("file path: " + fileEntry.fullPath);

        };

    }, onError);
}

/////////////////////////////