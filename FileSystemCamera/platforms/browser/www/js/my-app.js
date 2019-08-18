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


/////       File system
/*
function tryingFile(){

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);
   
}

function fileSystemCallback(fs){

    // Name of the file I want to create
    //var fileToCreate = "newPersistentFile.txt";
    var fileToCreate = "newpicture.jpeg";


    // Opening/creating the file
    fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);
}

var fileSystemOptionals = { create: true, exclusive: false };

function getFileCallback(fileEntry){
    
    //var dataObj = new Blob(['Hello'], { type: 'text/plain' });
    var dataObj = new Blob([myImage], { type: 'image/jpeg' });
    // Now decide what to do
    // Write to the file
    writeFile(fileEntry, dataObj);

    // Or read the file
    readFile(fileEntry);

    
}

// Let's write some files
/*
function writeFile(fileEntry, dataObj) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            //dataObj = new Blob(['Hello'], { type: 'text/plain' });
            dataObj = new Blob([myImage], { type: 'image/jpeg' });
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
*/
/*
function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            readFile(fileEntry);
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob([myImage], { type: 'image/jpeg' });
        }

        fileWriter.write(dataObj);
    });
}

function readBinaryFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {

            console.log("Successful file write: " + this.result);
            //displayFileData(fileEntry.fullPath + ": " + this.result);

            var blob = new Blob([new Uint8Array(this.result)], { type: "image/jpeg" });
            displayImage(blob);
        };

        reader.readAsArrayBuffer(file);

    }, onErrorReadFile);
}

// Let's read some files
function readFile(fileEntry) {

    // Get the file from the file entry
    fileEntry.file(function (file) {
        
        // Create the reader
        var reader = new FileReader();
        //reader.readAsText(file);
       // reader.readAsArrayBuffer(file);
       // reader.readAsDataURL(file);
       //var blob = new Blob([new Uint8Array(this.result)], { type: "image/png" });
      // var blob = new Blob([myImage], { type: 'image/jpeg' });
        //displayImage(blob);
        reader.onloadend = function() {

            console.log("Successful file read: " + this.result);
            console.log("file path: " + fileEntry.fullPath);
            var dataObj = new Blob([new Uint8Array(this.result)], { type: "image/jpeg" });
            displayImage(dataObj);
        };

        reader.readAsArrayBuffer(file);
    }, onError);
}

function onError(msg){
    console.log(msg);
}

function displayImage(blob) {

    // Displays image if result is a valid DOM string for an image.
    var elem = document.getElementById('imageFile');
    // Note: Use window.URL.revokeObjectURL when finished with image.
    elem.src = window.URL.createObjectURL(blob);
}
*/


//// camera

/*
function takePics(){
    navigator.camera.getPicture(cameraCallback, onError);
    }
function cameraCallback(imageData) {
    var image = document.getElementById('myImage');
    image.src = imageData;
    console.log('camera is working');
    getFileEntry();
    }

// take a photo using the web browser, the code is slightly different
/*
function cameraCallback(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
        }
*/
function onError(msg){
    console.log(msg);
}

/////

/// NEW FILE system

//////////////////////////////////////version 2 ////////////////////////////////////////////////////////////////////////

/*

function tryingFile(){

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);
   
}

function fileSystemCallback(fs){

    // Name of the file I want to create
    //var fileToCreate = "newPersistentFile.txt";
    var fileToCreate = "tempFile.jpeg";


    // Opening/creating the file
    fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);
}

var fileSystemOptionals = { create: true, exclusive: false };

function getFileCallback(fileEntry){
    
    //var dataObj = new Blob(['Hello'], { type: 'text/plain' });
    var dataObj = new Blob([myImage], { type: 'image/jpeg' });
    // Now decide what to do
    // Write to the file
    writeFile(fileEntry, dataObj);

    // Or read the file
    readFile(fileEntry);

    
}

// Let's read some files
function readFile(fileEntry) {

    // Get the file from the file entry
    fileEntry.file(function (file) {
        
        // Create the reader
        var reader = new FileReader();
        //reader.readAsText(file);
       reader.readAsArrayBuffer(file);
       console.log(file);
       // reader.readAsDataURL(file);
       //var blob = new Blob([new Uint8Array(this.result)], { type: "image/png" });
      // var blob = new Blob([myImage], { type: 'image/jpeg' });
        //displayImage(blob);
        reader.onloadend = function() {

            console.log("Successful file read: " + this.result);
            console.log("file path: " + fileEntry.fullPath);
            var dataObj = new Blob([new Uint8Array(this.result)], { type: "image/jpeg" });
            displayImage2(dataObj);
        };

        reader.readAsArrayBuffer(file);
    }, onError);
}


function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}

function takePics(selection) {

    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);
    var func = createNewFileEntry;

     
    navigator.camera.getPicture(function cameraSuccess(imageUri)  {

        
        displayImage(imageUri);
        // You may choose to copy the picture, save it somewhere, or upload.
        createNewFileEntry(imgUri);
        func(imageUri);
        

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);

}

function displayImage(imgUri) {

    var elem = document.getElementById('myImage');
    elem.src = imgUri;
}

function createNewFileEntry(imgUri) {
    window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {

        // JPEG file
        dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {

            // Do something with it, like write to it, upload it, etc.
             writeFile(fileEntry, imgUri);
            console.log("got file: " + fileEntry.fullPath);
            // displayFileData(fileEntry.fullPath, "File copied to");

        });

    });
}

function openFilePicker(selection) {

    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);
    var func = createNewFileEntry;

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        // Do something

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}

function writeFile(fileEntry, dataObj) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            if (dataObj.type == "image/jpeg") {
                readBinaryFile(fileEntry);
            }
            else {
                readFile(fileEntry);
            }
        };

        fileWriter.onerror = function(e) {
            console.log("Failed file write: " + e.toString());
        };

        fileWriter.write(dataObj);
    });
}

function readBinaryFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {

            console.log("Successful file write: " + this.result);
            //displayFileData(fileEntry.fullPath + ": " + this.result);

            var blob = new Blob([new Uint8Array(this.result)], { type: "image/jpeg" });
            displayImage2(blob);
        };

        reader.readAsArrayBuffer(file);

    });
}

function displayImage2(blob) {

    // Displays image if result is a valid DOM string for an image.
    var elem = document.getElementById('imageFile2');
    // Note: Use window.URL.revokeObjectURL when finished with image.
    elem.src = window.URL.createObjectURL(blob);
}

*/
function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}

function displayImage(imgUri) {

    var elem = document.getElementById('ShowmyPicture');
    elem.src = imgUri;
}

function openFilePicker(selection) {

    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);
    var func = createNewFileEntry;

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        // Do something

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}

function takePics(selection) {

    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);
    var func = createNewFileEntry;

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        displayImage(imageUri);
        console.log("Camera working");
        // You may choose to copy the picture, save it somewhere, or upload.
        getFileEntry(imgUri);
        //storeImage(imageUri);
        func(imageUri);

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    });
}

function getFileEntry(imgUri) {
    window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {

        // Do something with the FileEntry object, like write to it, upload it, etc.
        // writeFile(fileEntry, imgUri);
        createNewFileEntry(imgUri);
        console.log("got file: " + fileEntry.fullPath);
        // displayFileData(fileEntry.nativeURL, "Native URL");

    }, function () {
      // If don't get the FileEntry (which may happen when testing
      // on some emulators), copy to a new FileEntry.
        createNewFileEntry(imgUri);
    });
}




function createNewFileEntry(imgUri) {
    //window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {
        window.resolveLocalFileSystemURL(LocalFileSystem.PERSISTENT, 0, function success(dirEntry) {

        // JPEG file
        dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {

            // Do something with it, like write to it, upload it, etc.
             writeFile(fileEntry, imgUri);
            console.log("got file: " + fileEntry.fullPath);
            // displayFileData(fileEntry.fullPath, "File copied to");

        });

    });
}

function writeFile(fileEntry, imgUri, isAppend) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            if (imgUri.type == "image/jpeg") {
                 
                 dataObj = new Blob([tempFile.jpeg], { type: 'image/jpeg' });
                readBinaryFile(fileEntry);
            }
            else {
                readFile(fileEntry);
            }
        };

        fileWriter.onerror = function(e) {
            console.log("Failed file write: " + e.toString());
        };

        fileWriter.write(dataObj);
    });
}

function readBinaryFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {

            console.log("Successful file write: " + this.result);
            displayFileData(fileEntry.fullPath + ": " + this.result);

            var blob = new Blob([new Uint8Array(this.result)], { type: "image/jpeg" });
            displayImage(blob);
        };

        //reader.readAsArrayBuffer(file);
        reader.readAsBinaryString(file)

    });
}

function displayImage2(blob) {

    // Displays image if result is a valid DOM string for an image.
    var elem = document.getElementById('imageFile2');
    // Note: Use window.URL.revokeObjectURL when finished with image.
    elem.src = window.URL.createObjectURL(blob);
    var test = tempFile.jpeg;
    document.getElementById('imageFile3').innerHTML= test;
}

function readFile(fileEntry) {

    // Get the file from the file entry
    fileEntry.file(function (file) {
        
        // Create the reader
        var reader = new FileReader();
        //reader.readAsText(file);
       // reader.readAsArrayBuffer(file);
       // reader.readAsDataURL(file);
       //var blob = new Blob([new Uint8Array(this.result)], { type: "image/png" });
      // var blob = new Blob([myImage], { type: 'image/jpeg' });
        //displayImage(blob);
        reader.onloadend = function() {

            console.log("Successful file read: " + this.result);
            console.log("file path: " + fileEntry.fullPath);
            var dataObj = new Blob([new Uint8Array(this.result)], { type: "image/jpeg" });
            displayImage2(dataObj);
        };
        reader.readAsBinaryString(file);
        //reader.readAsArrayBuffer(file);
    });
}