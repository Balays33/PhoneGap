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

var erate=0.89

function exchange(){
    var usaD = document.getElementById('USAdollar').value;
    console.log(usaD);
    
    document.getElementById('EURO').value = usaD*erate;

}

function exchange2(){
    var euro2 = document.getElementById('EURO2').value;
    console.log(euro2);
    document.getElementById('USAdollar2').value = euro2/erate;

}

function exchange3(){

   
    var http = new XMLHttpRequest();
    const url = 'http://apilayer.net/api/live?access_key=310ff77de7a824ad7b6774e18cf4e29e';
    http.open("GET", url);
    http.send();

    http.onreadystatechange = (e) => {
        
        var response = http.responseText;

        var responseJSON = JSON.parse(response); 
    
        console.log(responseJSON);

        // Extracting the individual values, just as we
        // do with any JSON object. Just as we did 
        // with the position.
        // REMEMBER: In this case, we have an array inside 
        // the JSON object.
        var eurorate = responseJSON.quotes.USDEUR;
        //var usd = responseJSON.quotes.USDEUR;
        console.log(eurorate);
        alert(eurorate);
        var oc = eurorate;
        exchangeratioUSDEUR = responseJSON.quotes.USDEUR;
        // Formattng data to put it on the front end
        


        document.getElementById('rate').innerHTML = oc;
        console.log(oc);
    }
    
}
/*
function exchange3(){
    // set endpoint and your access key
endpoint = 'live'
access_key = '310ff77de7a824ad7b6774e18cf4e29e';

 

// get the most recent exchange rates via the "live" endpoint:
$.ajax({
    url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key,   
    dataType: 'jsonp',
    success: function(json) {

        // exchange rata data is stored in json.quotes
        alert(json.quotes.USDEUR);
        erate = json.quotes.USDEUR;
        document.getElementById('rate').innerHTML = erate;
        // source currency is stored in json.source
        alert(json.source);
        
        // timestamp can be accessed in json.timestamp
       // alert(json.timestamp);
        
    }
});
}
*/