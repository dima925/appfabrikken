angular.module('starter.controllers.app', ['ngAnimate']).controller('AppCtrl', function ($scope, $rootScope, Tools, Constants, Session, $cordovaSocialSharing) {
  // Check Authentication, if failed, return login page.
//  $scope.$on('$ionicView.beforeEnter', function () {
//    Tools.checkAuth(true);
//  });
  var app = this;
  app.Tools = Tools;
  app.Session = Session;
  app.Constants = Constants;
  
  // Clear all sessions and redirect to login page
  $scope.logout = function () {
    Session.clear(function () {
      Tools.changePage('login');
    });
  };
  $scope.user = Session.user();
  $rootScope.$on('updateUserData', function() {
     $scope.user = Session.user();
  });
});
