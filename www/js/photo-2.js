(function () {

    var serverURL = 'http://loyolalawtech.org:3001', // IMPORTANT: This URL needs to be accessible from your phone for testing.

        // Upload image to server
        upload = function (imageURI) {
            var ft = new FileTransfer(),
            options = new FileUploadOptions();
            options.fileKey = 'file';
            options.fileName = 'filename.jpg'; // We will use the name auto-generated by Node at the server side.
            options.mimeType = 'image/jpeg';
            options.chunkedMode = false;
            options.params = { // Whatever you populate options.params with, will be available in req.body at the server-side.
                'description': 'Uploaded from my phone'
            };

            ft.upload(imageURI, serverURL + '/upload',
                function (e) {
                    alert('Upload failed');
                }, options);
        },

        // Take a picture using the camera or select one from the library
        takePicture = function (e) {
            alert('click');
            var options = {
                quality: 45,
                targetWidth: 1000,
                targetHeight: 1000,
                destinationType: Camera.DestinationType.FILE_URI,
                encodingType: Camera.EncodingType.JPEG,
                sourceType: Camera.PictureSourceType.CAMERA
            };

            navigator.camera.getPicture(
                function (imageURI) {
                    console.log(imageURI);
                    upload(imageURI);
                },
                function (message) {
                    // We typically get here because the use canceled the photo operation. Fail silently.
            }, options);

            return false;

        };

    $('.container-content').on('click', '.camera-btn', takePicture());

}());