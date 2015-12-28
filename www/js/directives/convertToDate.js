/****************************************
 * Custom directive for select box.
 * @param {type} param1
 * @param {type} param2
 ***************************************/

angular.module('starter.directives.convertToDate', [])
.directive('convertToDate', function() {
  function link(scope, element, attrs) {
    var date = attrs.myDate;
    console.log(date, new Date(date));
    element.text(moment(date).format('MM/DD/YYYY'));
  }

  return {
    link: link
  };
});