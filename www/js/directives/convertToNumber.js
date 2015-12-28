/****************************************
 * Custom directive for select box.
 * @param {type} param1
 * @param {type} param2
 ***************************************/

angular.module('starter.directives.convertToNumber', [])
.directive('convertToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(val) {
        return parseInt(val, 10);
      });
      ngModel.$formatters.push(function(val) {
        return '' + val;
      });
    }
  };
});