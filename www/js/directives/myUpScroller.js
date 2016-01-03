angular.module('starter.directives.myUpScroller', [])
        .directive('myUpScroller', function ($ionicScrollDelegate) {
            return {
                restrict: 'E',
                controller: function ($scope) {
                    $scope.gotoTop = function () {
                      $ionicScrollDelegate.scrollTop(true);
                    };
                    $(".menu-container").scroll(function(obj){
                      var scrollPos = $ionicScrollDelegate.getScrollPosition().top;
                      if(scrollPos > 15){
                        $(".scroll-go-to").slideDown('fast');
                      }else{
                        $(".scroll-go-to").slideUp('fast');
                      }
                    });
                },
                link: function ($scope, ele, attrs, c) {
                    var clickHandler = function () {
                        $scope.gotoTop();
                    };
                    ele.unbind('click', clickHandler)
                            .bind('click', clickHandler);
                },
                templateUrl: 'templates/partials/up-scroller.html'
            };
        });
