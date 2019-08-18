/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


////   Storing files in the phone

function tryingFile(){

    


      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

        console.log('file system open: ' + fs.name);
        fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false }, function (fileEntry) {
    
            console.log("fileEntry is file?" + fileEntry.isFile.toString());
            // fileEntry.name == 'someFile.txt'
            // fileEntry.fullPath == '/someFile.txt'
            writeFile(fileEntry, null);
            readFile(fileEntry);
    
        });
    
    });
}

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
            dataObj = new Blob(['some file data'], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);
    });
}

function readFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {
            console.log("Successful file read: " + this.result);
            //displayFileData(fileEntry.fullPath + ": " + this.result);
        };

        reader.readAsText(file);

    });
}
/*
function tryingFile2(){
    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {

        console.log('file system open: ' + fs.name);
        getSampleFile(fs.root);
    
    });
}

function getSampleFile(dirEntry) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://cordova.apache.org/static/img/cordova_bot.png', true);
    xhr.responseType = 'blob';

    xhr.onload = function() {
        if (this.status == 200) {

            var blob = new Blob([this.response], { type: 'image/png' });
            saveFile(dirEntry, blob, "downloadedImage.png");
        }
    };
    xhr.send();
}

function saveFile(dirEntry, fileData, fileName) {

    dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {

        writeFile(fileEntry, fileData);

    });
}

function writeFile(fileEntry, dataObj, isAppend) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            if (dataObj.type == "image/png") {
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

            var blob = new Blob([new Uint8Array(this.result)], { type: "image/png" });
            displayImage(blob);
        };

        reader.readAsArrayBuffer(file);

    });
}

function displayImage(blob) {

    // Displays image if result is a valid DOM string for an image.
    var elem = document.getElementById('myImage2');
    // Note: Use window.URL.revokeObjectURL when finished with image.
    elem.src = window.URL.createObjectURL(blob);
}
*/

/*

function tryingFile3(){

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);
   
}

function fileSystemCallback(fs){

    // Name of the file I want to create
    var fileToCreate = "newPersistentFile.jpg";

    // Opening/creating the file
    fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);
}

var fileSystemOptionals = { create: true, exclusive: false };

function getFileCallback(fileEntry){
    
    var dataObj = new Blob([myImage], { type: 'image/png' });
    saveFile2(fileEntry, dataObj, "downloadedImage.png");
    // Now decide what to do
    // Write to the file
    writeFile2(fileEntry, dataObj);

    // Or read the file
    readFile(fileEntry);

    //display file
    readBinaryFile2(fileEntry);
}

// Let's write some files
function writeFile2(fileEntry, dataObj) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob([myImage], { type: 'image/jpg' });
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

function readBinaryFile2(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {

            console.log("Successful file write: " + this.result);
            //displayFileData(fileEntry.fullPath + ": " + this.result);

            //var blob = new Blob([new Uint8Array(this.result)], { type: "image/png" });
            var blob = new Blob([myImage], { type: 'image/jpg' });
            console.log(blob);
            displayImage(blob);
        };

        reader.readAsArrayBuffer(file);

    });
}

function onError(msg){
    console.log(msg);
}

function saveFile2(fileEntry, fileData, fileName) {

    fileEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {

        writeFile2(fileEntry, fileData);

    });
}
*/

function tryingFile4(){
    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {

        console.log('file system open: ' + fs.name);
        getSampleFile(fs.root);
    
    });
}

function getSampleFile(dirEntry) {

    //var blob = new Blob([myImage], { type: 'image/jpg' });
    //saveFile(dirEntry, blob, "downloadedImage.jpg");
    /*
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://cordova.apache.org/static/img/cordova_bot.png', true);
    xhr.responseType = 'blob';

    xhr.onload = function() {
        if (this.status == 200) {

            var blob = new Blob([this.response], { type: 'image/png' });
            saveFile(dirEntry, blob, "downloadedImage.png");
        }
    };
    xhr.send();
    */
   var xhr = new XMLHttpRequest();
    xhr.open("GET", "./apple.jpg");
    xhr.responseType = "arraybuffer";
 
    xhr.onload = function(error) {
        var blob = new Blob([xhr.response]);
        var blobUrl = URL.createObjectURL(blob);
        console.log(blobUrl);
        document.getElementById("image").src = blobUrl;
    }
    xhr.send();
}

function saveFile(dirEntry, fileData, fileName) {

    dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {

        writeFile(fileEntry, fileData);

    });
}

function writeFile(fileEntry, dataObj, isAppend) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            if (dataObj.type == "image/jpg") {
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

            //var blob = new Blob([new Uint8Array(this.result)], { type: "image/png" });
            var blob = new Blob([myImage], { type: 'image/jpg' });
            displayImage(blob);
        };

        reader.readAsArrayBuffer(file);

    });
}

function displayImage(blob) {

    console.log(blob);
    // Displays image if result is a valid DOM string for an image.
    var elem = document.getElementById('myImage2');
    // Note: Use window.URL.revokeObjectURL when finished with image.
    elem.src = window.URL.createObjectURL(blob);
}