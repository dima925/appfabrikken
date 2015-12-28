angular.module('starter.services.Push', [])
  .factory('Push', function($ionicUser, $ionicPush, $ionicPlatform, $q, Session) {

    var _isPushIntialized = false;

    var _identifyIonicUser = function(user) {
      var ionicUser = $ionicUser.get();

      if (!ionicUser.user_id) {
        ionicUser.user_id = user.id.toString();
      }

      return $ionicUser.identify(ionicUser);
    };

    var _pushRegister = function(onNotification) {
      $ionicPush.register({
        canShowAlert: true, //Can pushes show an alert on your screen?
        canSetBadge: true, //Can pushes update app icon badges?
        canPlaySound: true, //Can notifications play a sound?
        canRunActionsOnWake: true, //Can run actions outside the app,
        onNotification: onNotification
      });
    };

    var Push = {

      init: function(user, onNotification) {
        if (_isPushIntialized) return;

        _identifyIonicUser(user)
          .then(function() {
            _isPushIntialized = true;
            _pushRegister(onNotification);
          });
      }

    };

    return Push;

  });
