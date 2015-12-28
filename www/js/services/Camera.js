angular.module('starter.services.Camera', []).factory('Camera', function ($q, $cordovaCamera) {
  return {
    getPicture: function () {
      var q = $q.defer();
      var options = {
        quality: 30,
        targetWidth: 720,
        sourceType: navigator.camera.PictureSourceType.CAMERA,
//        destinationType: navigator.camera.DestinationType.DATA_URL,
        destinationType: navigator.camera.DestinationType.FILE_URL,
        allowEdit: true,
        correctOrientation: true,
        encodingType: navigator.camera.EncodingType.JPEG,
        popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, navigator.camera.PopoverArrowDirection.ARROW_ANY),
        saveToPhotoAlbum: false
      };

      if (isCordova()) {
        $cordovaCamera.getPicture(options).then(function (imageData) {
          var dataAvatar = imageData;
//          var dataAvatar = "data:image/jpeg;base64," + imageData;
          q.resolve(dataAvatar);
//          $.canvasResize(dataAvatar, {
//            width: 720,
//            quality: 100,
//            callback: function (dataAvatar) {
//              q.resolve(dataAvatar);
//            }
//          });
        }, function (err) {
          q.reject(err);
        });
      }else{
        q.reject('Cordova not found.');
      }

      return q.promise;
    }
  }
});