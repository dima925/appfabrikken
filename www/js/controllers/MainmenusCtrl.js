angular.module('starter.controllers.mainmenus', []).controller('MainmenusCtrl', function ($scope, $ionicLoading, $state, Api, Constants, $rootScope) {
  $scope.mainmenus = [];
  $ionicLoading.show();
  $rootScope.selectedItem = {};
  Api.getMainMenu().then(function (data) {
    $ionicLoading.hide();
    $scope.mainmenus = data;
  }, function (err) {
    if(is_Null(err)) err = "Invalided User";
    $scope.errorsLogin = [err];
    $ionicLoading.hide();
  });
  
  $scope.select = function(id, item){
    var url = Constants.FB_URL + 'menus/' + id + '/items/';
    $rootScope.selectedItem.navbar_title = item.title;
    $rootScope.selectedItem.footer_text = item.footer_text;
    $state.go('psmenus', {url:url});
  };
});
