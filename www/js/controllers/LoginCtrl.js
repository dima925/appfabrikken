angular.module('starter.controllers.login', []).controller('LoginCtrl', function ($scope, $ionicLoading, Tools, Api, Session) {
  $scope.loginData = {
    email: {type: "email", value: ''},
    password: {type: "password", value: ''}
  };
  $scope.user = Session.user();
  $scope.dataAvatar = (!is_Null($scope.user.uInfoLogoUrl))?$scope.user.uInfoLogoUrl:"img/ionic.png";

  // Perform the login action when the user submits the login form
  $scope.doLogin = function () {
    $scope.errorsLogin = [];
    // Before perform login action, check the validation of login data.
    Tools.checkData($scope.loginData, function (errors, data) {
      if (Object.size(errors) == 0) {
        $ionicLoading.show({
          content: 'Login...',
          showBackdrop: false
        });
        var loginData = {email:$scope.loginData.email.value, password:$scope.loginData.password.value};
        // Perform Login api
        Api.login(loginData).then(function (dataUser) {
          $ionicLoading.hide()
          console.log(dataUser);
          Tools.changePage('mainmenus', true);
        }, function (err) {
          if(is_Null(err)) err = "Invalided User";
          $scope.errorsLogin = [err];
          $ionicLoading.hide();
        });
      }
      else {
        $scope.errorsLogin = errors;
      }
    });
  };
  // Change page
  $scope.changePage = function (state) {
    Tools.changePage(state, true);
  };
});
