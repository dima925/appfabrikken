(function () {
  angular.module('starter.services.Api', [])
          .factory('Api', function ($http, $q, Constants, $firebaseArray, Session, $firebaseObject) {

            var Api = {
              login: function (user) {
                var deferred = $q.defer();
                var firebaseUrl = Constants.FB_URL;
                var ref = new Firebase(firebaseUrl);
                
                ref.authWithPassword(user, function(error, authData) {
                  if (error) {
                    deferred.reject(error.code);
                  } else {
                    deferred.resolve(authData);
                  }
                });
                
                return deferred.promise;
              },
              getMainMenu: function () {
                var deferred = $q.defer();
                var firebaseUrl = Constants.FB_URL + 'menus/';
                var ref = new Firebase(firebaseUrl);
                
                $firebaseArray(ref).$loaded(function(data) {
                  var mainMenus = data;
                  console.log(data);
                  deferred.resolve(mainMenus);
                }, function(error) {
                  deferred.reject({error: error.code});
                }); 
                return deferred.promise;
              },
              getArray: function (url) {
                var deferred = $q.defer();
                var ref = new Firebase(url);
                
                $firebaseArray(ref).$loaded(function(data) {
                  var array = data;
                  console.log(data);
                  deferred.resolve(array);
                }, function(error) {
                  deferred.reject({error: error.code});
                }); 
                return deferred.promise;
              },
              getObject: function (url) {
                var deferred = $q.defer();
                var ref = new Firebase(url);
                
                $firebaseObject(ref).$loaded(function(data) {
                  var array = data;
                  console.log(data);
                  deferred.resolve(array);
                }, function(error) {
                  deferred.reject({error: error.code});
                }); 
                return deferred.promise;
              }
            };

            return Api;

          });

})();
