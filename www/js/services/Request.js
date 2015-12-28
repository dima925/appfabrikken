angular.module('starter.services.Request', []).factory('Request', function ($q, $http, Constants, $templateCache, Session) {
//organizate.service('HttpService', function($q, $http, $rootScope, $templateCache,$cordovaVibration) {
  
  return {
    getRequest: function (endpoint) {
//        $cordovaVibration.vibrate(100);
      var deferred = $q.defer();
      $http.defaults.headers.common['Authorization'] = 'Bearer ' + Session.token();
      $http.get(Constants.API_URL + endpoint).
      success(function(data, status, headers, config) {
          deferred.resolve(data);
      }).
      error(function(err, status, headers, config) {
          deferred.reject(err);
      });
      return deferred.promise;
    },
    PostRequest: function (endpoint, prams) {
      var deferred = $q.defer();
      $http.defaults.headers.common['Authorization'] = 'Bearer ' + Session.token();
      var params = (prams)?prams:{};
//        $cordovaVibration.vibrate(100);
      $http({url: Constants.API_URL + endpoint,
        method: 'POST',
        data: params,
        headers: {'Content-Type': 'application/json'}
      }).then(function (response) {
        deferred.resolve(response.data);
      }, function (err) {
        deferred.reject(err.data);
      });
      return deferred.promise;
    },
    UploadRequest: function (endpoint, fileURLs) {
      var deferred = $q.defer();
      
      for(var i = 0; i < fileURLs.length; i++){
        var fileUrl = fileURLs[i];
        var uri = encodeURI(endpoint);
        var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=fileUrl.substr(fileUrl.lastIndexOf('/')+1);
        options.mimeType="text/plain";
        var headers={'Authorization':'Bearer ' + Session.token()};
        options.headers = headers;

        var ft = new FileTransfer();
        ft.upload(fileUrl, uri, function(res){
          deferred.resolve(res);
        }, function(err){
          deferred.reject(err);
        }, options);
      }      
      return deferred.promise;
    }
  }

});