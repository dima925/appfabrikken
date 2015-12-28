angular.module('starter.directives.timesheetbox', [])
        .directive('timeSheetBox', function () {
          return {
            restrict: 'E',
            scope: {
              time: '=info'
            },
            controller: function ($scope) {
              
            },
            link: function ($scope, ele, attrs, c) {
              
            },
            template: '<div class="item item-icon-right time-frame" ng-click="updateItem(day.key, time.from, time.to)">{{time.from}} - {{time.to}}<i class="icon ion-ios-close-empty" ng-click="deleteItem($index, day.key)"></i></div>'
          };
        })
