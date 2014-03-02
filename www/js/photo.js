// Wait for device API libraries to load

document.addEventListener('deviceready',onDeviceReady,false);

var pictureSource, destinationType;
// device APIs are available

function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
function onPhotoDataSuccess(imageData) {
    console.log(imageData);
    $('#smallImage').attr('src', 'data:image/jpeg;base64,' +imageData).show();
    $('.upload-button').show();
}

// Called when a photo is successfully retrieved
function onPhotoURISuccess(imageURI) {
    console.log(imageURI);
    $('#largeImage').attr('src', imageURI).show();
    $('.upload-button').show();
}

function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    destinationType: destinationType.DATA_URL });
}

function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
    destinationType: destinationType.DATA_URL });
}

function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}

// Called if something bad happens.
function onFail(message) {
    alert('Failed because: ' + message);
}

