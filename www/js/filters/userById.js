/****************************************
 * Custom filter to check the valid id of users
 * @param {type} param1
 * @param {type} param2
 ***************************************/

angular.module('starter.filters.userById', [])
  .filter('userById', function() {

    return function(users, id) {

      var out;

      var BreakException = {};

      try {
        angular.forEach(users, function(user) {
          if (user.id === id) {
            out = user;
            throw BreakException;
          }
        });
      } catch (e) {
        if (e !== BreakException) throw e;
      }

      return out;

    };

  });
