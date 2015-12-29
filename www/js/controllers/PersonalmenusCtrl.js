angular.module('starter.controllers.psmenus', []).controller('PersonalmenusCtrl', function ($scope, $ionicLoading, $stateParams, Api, Constants, $rootScope, $state) {
  $scope.menus = [];
  $scope.url = $stateParams.url;
  $ionicLoading.show();
  Api.getArray($scope.url).then(function (data) {
    $ionicLoading.hide();
    $scope.menus = data;
    console.log(data);
  }, function (err) {
    if(is_Null(err)) err = "Invalided User";
    $scope.errorsLogin = [err];
    $ionicLoading.hide();
  });
  
  $scope.select = function(id, item){
    console.log('item', item);
    var url = $scope.url + id + '/';
    $rootScope.selectedItem.navbar_title = item.navbar_title;
    $rootScope.selectedItem.footer_text = item.text;
    $state.go('psmenus', {url:url});
  };
});
