/****************************************
 * Custom directive for time picker.
 * @param {type} param1
 * @param {type} param2
 ***************************************/

angular.module('starter.directives.fomateTimeSheet', [])
        .directive('fomateTimeSheet', function () {
          return function (scope, element, attrs) {
            var timeString="";
            var backupTime="";

            scope.$watch(attrs.fomateTimeSheet, function (newValue, oldValue) {
              backupTime = oldValue;
              timeString = newValue;
              updateTime();
            });

            function updateTime() {
              var returnString = "";
              var splitArr = timeString.split(":");
              if (isNaN(splitArr[0] * 1)) {
                returnString = '';
              } else {
                
                if (splitArr[0] * 1 > 24){
                  alert(splitArr[0]);
                  returnString = '';
                }
              }
              if (splitArr.length > 1) {
                if (isNaN(splitArr[1] * 1)) {
                  returnString = '';
                } else {
                  if (splitArr[1] * 1 > 59)
                    returnString = splitArr[0] + ':';
                }
              }
              if (timeString.length == 2)
                returnString = timeString + ':';
              element[0].value = returnString;
            }
            ;
          }
        });