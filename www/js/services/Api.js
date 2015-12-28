(function () {
  angular.module('starter.services.Api', [])
          .factory('Api', function ($http, $q, Constants, Storage, Session, Request) {

            var Api = {
              bisUrl:'businesses/' + Session.businessesId() + '/',
              setAuthorization: function (token) {
                $http.defaults.headers.common = {
                  Authorization: token,
                  // "Content-Type" : "multipart/form-data"
                };
              },
              login: function (user) {
                var deferred = $q.defer();
                $http({url: Constants.AUTH_URL,
                  method: 'POST',
                  data: user,
                  headers: {'Content-Type': 'application/json; charset=utf-8'}
                }).then(function (response) {
                  console.log(response);
                  if(response.status == 200) Session.setToken(response.data.accessToken);
                  deferred.resolve(response);
                }, function (err) {
                  deferred.reject(err.data);
                });
                return deferred.promise;
              },
              loginCheck: function () {
                var deferred = $q.defer();
                var user = Session.user();
                Request.PostRequest('loginCheck', {id: user.userid}).then(function (user) {
                  if (user.status == 'OK') {
                    Session.setUser(user.result);
                  }
                  deferred.resolve(user.result);
                }, function (err) {
                  deferred.reject({error: err.error});
                });
                return deferred.promise;
              },
              getBisinesses: function () {
                var deferred = $q.defer();
                Request.getRequest('businesses').then(function (data) {
                  console.log(data);
                  deferred.resolve(data);
                }, function (err) {
                  deferred.reject({error: err.error});
                });
                return deferred.promise;
              },
              uploadImage:function(fileURL, incidentId){
                var deferred = $q.defer();
                var uri = encodeURI('businesses/' + Session.businessesId() + '/incidents/'+incidentId+'/updateimages');
                var options = new FileUploadOptions();
                options.fileKey="file";
                options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
                options.mimeType="image/jpeg";

                var headers={'Authorization':'Bearer ' + Session.token()};

                options.headers = headers;

                var ft = new FileTransfer();
                ft.upload(fileURL, uri, function(data){
                    deferred.resolve(data);
                }, function(err){
                    deferred.reject({error: err});
                }, options);
              },
              getLocations: function () {
                var deferred = $q.defer();
                Request.getRequest('businesses/' + Session.businessesId() + '/locations').then(function (data) {
                  console.log(data);
                  deferred.resolve(data);
                }, function (err) {
                  deferred.reject({error: err.error});
                });
                return deferred.promise;
              },
              createIncident: function(data){
                var deferred = $q.defer();
                if(Session.businessesId()){
                  Request.PostRequest('businesses/' + Session.businessesId() + '/incidents', data).then(function (respdata) {
                    console.log(respdata);
                    deferred.resolve(respdata.result);
                  }, function (err) {
                    console.log(err);
                    deferred.reject({error: err});
                  });
                }else{
                  deferred.resolve(respdata.result);
                }                
                return deferred.promise;
              }
            };

            return Api;

          });

})();
