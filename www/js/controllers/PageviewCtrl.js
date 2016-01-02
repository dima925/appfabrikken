angular.module('starter.controllers.pageview', []).controller('PageviewCtrl', function ($scope, $ionicLoading, $stateParams, Api, Tools, $rootScope, $state) {
  $scope.menus = [];
  $scope.url = $stateParams.url;
  $ionicLoading.show();
  Api.getObject($scope.url).then(function (data) {
    $ionicLoading.hide();
    $scope.page = data;
    (!is_Null(data.customstyle))? Tools.changeCustomStyle(data.customstyle) : Tools.changeCustomStyle({});
    console.log(data);
  }, function (err) {
    if(is_Null(err)) err = "Invalided User";
    $scope.errorsLogin = [err];
    $ionicLoading.hide();
  });
  
  $scope.select = function (id, item) {
    console.log('item', item);
    if (item.type == 'page') {

    } else {
      if (!is_Null(item.items)) {
        var url = $scope.url + id + '/items/';
        $rootScope.selectedItem.navbar_title = item.navbar_title;
        $rootScope.selectedItem.footer_text = item.text;
        $state.go('psmenus2', {url: url});
      }else{
        alert("There is no any content.");
      }
    }
  };
});
