(function () {
  angular.module('starter.services.Tools', []).factory('Tools', function ($window, $location, $rootScope, $http, $timeout, $ionicHistory, $filter, Constants, $state, Session, Api) {

    return {
      setAll: function (a, v) {
        var i, n = a.length;
        for (i = 0; i < n; ++i) {
          a[i] = v;
        }
        return a;
      },
      historyBack: function () {
        $window.history.back();
      },
      triggerUserConnected: function () {
        Session.set('isConnected', true);
        $rootScope.$emit('app:userConnected');
      },
      checkAuth: function (flag) {
        var self = this;
        var page = $ionicHistory.currentStateName();
        var store = Session.store();
//        alert(store);
        if (Session.user() && flag) {
          Api.loginCheck().then(function (res) {
            if (res.uActive == "0") {
              Session.clear(function () {
                self.changePage('login', false);
                $rootScope.errorsLogin=["Your account is not activated yet."];
              });
            } else {
              if (page == 'login') {
                self.changePage('app.takepicture', true);
              }
              $timeout(function(){
                $rootScope.$broadcast('updateUserData');
              }, 500);              
            }

          }, function (err) {
            Session.clear(function () {
              self.changePage('login');
            });
          });
        } else {
          self.changePage('login');
        }
      },
      changePage: function (state, clear) {
        if (clear != undefined)
          $ionicHistory.clearCache();
        $state.go(state);
      },
      notationToStars: function (notation) {
        return ['', '', '', '', ''].map(function (star, i) {
          return i < Math.round(notation) ? 'active' : 'default';
        });
      },
      checkData: function (dataForm, callback) {
        var data = {}, errors = {}, empty = false;
        for (var i in dataForm) {

          if (dataForm[i].value == undefined) {
            errors[i] = "Some fields is invalid.";
          }
          else {
            var value = dataForm[i].value.toString();
            if (value.trim() == '') {
              errors[i] = "Some fields is empty.";
              empty = true;
            }
            if (dataForm[i].type == 'email' && errors[i] == undefined) {
              var re = /\S+@\S+\.\S+/;
              if (re.test(dataForm[i].value) == false)
                errors[i] = "Bad email";
            }
            if (dataForm[i].type == 'password' && errors[i] == undefined) {
              if (dataForm[i].value.length < 4)
                errors[i] = "Password too short";
            }
            if (dataForm[i].type == 'passwordconfirm' && errors[i] == undefined) {
              if (dataForm[i].pass !== dataForm[i].value)
                errors[i] = "Confirm password is not matched";
            }
          }

        }
        callback.call(this, errors, data);
      },
      checkUserInfo: function (dataForm, callback) {
        var validData = [
          {key: 'uInfoName', value: 'Please enter your name.', type: 'text'},
          {key: 'uInfoTel', value: 'Please enter your phone number.', type: 'tel'},
          {key: 'uInfoMail', value: 'Please enter your contact email address.', type: 'email'},
          {key: 'uInfoSeo', value: 'Please enter your information.', type: 'text'},
          {key: 'optionsID', value: 'Please select an option.', type: 'text'},
          {key: 'locationID', value: 'Please select a location.', type: 'text'}
        ];
        var errors = {};
        var data = {};
        for (var i = 0; i < validData.length; i++) {
          if (is_Null(dataForm[validData[i].key])) {
            errors[validData[i].key] = validData[i].value;
          } else {
            data[validData[i].key] = dataForm[validData[i].key];
          }
        }
        data.uID = Session.user().userid;
        data.uInfoGeoLat = Session.user().uInfoGeoLat;
        data.uInfoGeoLong = Session.user().uInfoGeoLong;
        callback.call(this, errors, data);
      },
      getTimeArray: function(val){
        var timeArr = val.split(':');
        var result = {};
        result.hour = timeArr[0];
        result.mins = timeArr[1];
        return result;
      },
      validTimeFormate: function (val, key) {
        var tempVal = val * 1;
        if (key === 'hour') {
          if (tempVal > 24)
            tempVal = 0;
          if (tempVal < 0)
            tempVal = 24;
        } else {
          if (tempVal > 59)
            tempVal = 0;
          if (tempVal < 0)
            tempVal = 59;
        }
        return tempVal;
      },
      validDate: function(date){
        return moment(date).format('MM/DD/YYYY');
      },
      validBoolean: function(val){
        var returnval = (val)?"Yes":"No";        
        return returnval;
      },
      checkApiResponse: function (response, callback) {
        var errors = [], success = false;
        if (response.errors) {
          for (var i = 0, length = response.errors.length; i < length; i++) {
            errors.push(response.errors[i]);
          }
        }
        else {
          success = true;
        }
        callback.call(this, errors, success);
      },
      loadJson: function (url, verb, data, callbackSuccess, callbackError) {
        var req = {
          method: verb,
          url: Constants.urlApi + url,
          headers: {
            'Content-Type': undefined
          },
          data: data
        };

        $http(req).success(function (data) {
        }).error(function (data) {
          callbackError.call(this, data);
        });
      },
      stopEventPropagation: function (e) {
        e.stopPropagation();
      },
    };

  });

  Object.size = function (obj) {
    // return Object.keys(obj).length;
    // ;)
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key))
        size++;
    }
    return size;
  };

})();