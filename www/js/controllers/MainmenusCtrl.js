angular.module('starter.controllers.mainmenus', []).controller('MainmenusCtrl', function ($scope, $ionicLoading, $state, Api, Constants, $rootScope, Tools) {
  $scope.mainmenus = [];
  $ionicLoading.show();
  $rootScope.selectedItem = {};
  $rootScope.defaultStyle = {navbarBgColor:'#f7f7f8', navbarTextColor:'#000', pageBgColor:'#EFEFF4'};
  Tools.changeCustomStyle({});
  Api.getMainMenu().then(function (data) {
    $ionicLoading.hide();
    $scope.mainmenus = data;
  }, function (err) {
    if(is_Null(err)) err = "Invalided User";
    $scope.errorsLogin = [err];
    $ionicLoading.hide();
  });
  
  $scope.select = function(id, item){
    var url = Constants.FB_URL + 'menus/' + id;
    $state.go('psmenus1', {url:url});
  };
});
