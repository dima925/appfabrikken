angular.module('starter.controllers.psmenus5', []).controller('PersonalmenusCtrl_5', function ($scope, $ionicLoading, $stateParams, Api, Constants, $rootScope, $state, Tools, $firebaseArray, $firebaseObject) {
  $scope.menus = [];
  
  $scope.url = $stateParams.url;
  $scope.Tools = Tools;
  $rootScope.selectedItem = $rootScope.selectedItem || {};
  $ionicLoading.show();
  var itemsRef = new Firebase($scope.url + '/items');
  var styleRef = new Firebase($scope.url + '/customstyle');
  var mainRef = new Firebase($scope.url);
                
  $firebaseArray(itemsRef).$loaded(function(data) {
    $ionicLoading.hide();
    $scope.menus = data;
    Tools.changeCustomStyle($scope.customstyle);
    console.log('itemsRef',data);
  }, function(error) {
    $scope.errorsLogin = [error.code];
    $ionicLoading.hide();
  });
  
  $scope.select = function (id, item) {
    console.log('item', item);
    if (item.type == 'page') {
      var url = Constants.FB_URL + '/pages/' + item.pageId;
      Tools.changeCustomStyle(item.customstyle);    
      $state.go('pageview', {url: url});
    } else {
      alert("There is no any content.");
    }
  };
  $firebaseObject(styleRef).$watch(function(data) {
    $firebaseObject(styleRef).$bindTo($scope, "customstyle").then(function() {
      Tools.changeCustomStyle($scope.customstyle);      
    });
  });
  $scope.$on('$ionicView.beforeEnter', function(e) {
    $scope.context = {};
    $scope.customstyle = {};
    $firebaseObject(styleRef).$bindTo($scope, "customstyle");
    $firebaseObject(mainRef).$bindTo($scope, "context");
  });
});
