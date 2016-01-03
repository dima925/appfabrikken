angular.module('starter.controllers.pageview', []).controller('PageviewCtrl', function ($scope, $ionicLoading, $stateParams, Api, Tools, Constants, $state, $firebaseObject) {
  $scope.menus = [];
  $scope.url = $stateParams.url;
  $scope.pageId = $stateParams.pageid;
  $scope.page = {};
  $scope.pageinfo = {};
  $scope.customstyle = {};

  var pageurl = Constants.FB_URL + '/pages/' + $scope.pageId;

  var styleRef = new Firebase($scope.url + '/customstyle');
  var pageRef = new Firebase($scope.url);
  var mainRef = new Firebase(pageurl);
  $ionicLoading.show();

  $firebaseObject(styleRef).$watch(function (data) {
    $firebaseObject(styleRef).$bindTo($scope, "customstyle").then(function () {
      Tools.changeCustomStyle($scope.customstyle);
    });
  });
  $scope.$on('$ionicView.beforeEnter', function (e) {
    $firebaseObject(styleRef).$bindTo($scope, "customstyle");

    $firebaseObject(mainRef).$bindTo($scope, "page").then(function (data) {
      console.log('$scope.page', $scope.page);
      $ionicLoading.hide();
    }, function (err) {
      if (is_Null(err))
        err = "Invalided User";
      $scope.errorsLogin = [err];
      $ionicLoading.hide();
    });

    $firebaseObject(pageRef).$bindTo($scope, "pageinfo").then(function (data) {
      console.log('$scope.pageinfo', $scope.pageinfo.navbar_title);
      $ionicLoading.hide();
    }, function (err) {
      if (is_Null(err))
        err = "Invalided User";
      $scope.errorsLogin = [err];
      $ionicLoading.hide();
    });
  });
});
