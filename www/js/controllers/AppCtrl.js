angular.module('starter.controllers.app', ['ngAnimate']).controller('AppCtrl', function ($scope, $rootScope, Tools, Constants, Session, $ionicScrollDelegate) {
  // Check Authentication, if failed, return login page.
//  $scope.$on('$ionicView.beforeEnter', function () {
//    Tools.checkAuth(true);
//  });
  var app = this;
  app.Tools = Tools;
  app.Session = Session;
  app.Constants = Constants;
  $(".menu-container").scroll(function(obj){
    var scrollPos = $ionicScrollDelegate.getScrollPosition().top;
    if(scrollPos > 5){
      $(".scroll-go-to").slideDown('fast');
    }else{
      $(".scroll-go-to").slideUp('fast');
    }
  });
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
