angular.module('starter.services.BarcodeScan', []).factory('BarcodeScan', function ($q, $cordovaCamera) {
  return {
    scanCode: function () {
      var q = $q.defer();

      if (isCordova()) {
        cordova.plugins.barcodeScanner.scan(
                function (result) {
                  q.resolve(result.text);
                },
                function (error) {
                  q.reject("Scanning failed: " + error);
                }
        );
      } else {
        q.reject('Cordova not found.');
      }

      return q.promise;
    }
  }
});