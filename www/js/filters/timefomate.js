/****************************************
 * Custom filter to return valid time formate for input time type tag.
 * @param {type} param1
 * @param {type} param2
 ***************************************/

angular.module('starter.filters.timeFomate', [])
  .filter('timeFomate', function() {

    return function (input){
      
        if (isNaN(input))
            return '00:00 ';
        else
            return moment.utc(input).local().format('MM/DD/YYYY HH:MM A');
    };
  });
