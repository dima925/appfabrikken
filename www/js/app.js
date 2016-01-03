// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('myApp', [
  'ionic',
  'starter.controllers',
  'starter.services',
  'starter.directives',
  'starter.filters',
  'starter.constants',
  'firebase',
  'ngIOS9UIWebViewPatch',
  'ngCordova'
])

        .run(function ($ionicPlatform) {
          $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              cordova.plugins.Keyboard.disableScroll(true);
              window.addEventListener('native.keyboardshow', function () {
                document.body.classList.add('keyboard-open');
              });
            }
            if (window.StatusBar) {
              // org.apache.cordova.statusbar required
              StatusBar.styleDefault();
            }
          });
        })

        .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
          $stateProvider

                  .state('app', {
                    url: '/app',
                    abstract: true,
                    templateUrl: 'templates/menu.html',
                    controller: 'AppCtrl'
                  })
                  .state('login', {
                    cache: false,
                    url: '/login',
                    templateUrl: 'templates/login.html',
                    controller: 'LoginCtrl'
                  })
                  .state('mainmenus', {
                    url: '/mainmenus',
                    templateUrl: 'templates/mainmenus.html',
                    controller: 'MainmenusCtrl'
                  })
                  .state('psmenus1', {
                    url: '/psmenus1?url',
                    templateUrl: 'templates/psmenus1.html',
                    controller: 'PersonalmenusCtrl_1'
                  })
                  .state('psmenus2', {
                    url: '/psmenus2?url',
                    templateUrl: 'templates/psmenus2.html',
                    controller: 'PersonalmenusCtrl_2'
                  })
                  .state('psmenus3', {
                    url: '/psmenus3?url',
                    templateUrl: 'templates/psmenus3.html',
                    controller: 'PersonalmenusCtrl_3'
                  })
                  .state('psmenus4', {
                    url: '/psmenus4?url',
                    templateUrl: 'templates/psmenus4.html',
                    controller: 'PersonalmenusCtrl_4'
                  })
                  .state('psmenus5', {
                    url: '/psmenus5?url',
                    templateUrl: 'templates/psmenus5.html',
                    controller: 'PersonalmenusCtrl_5'
                  })
                  .state('pageview', {
                    url: '/pageview?url&pageid',
                    templateUrl: 'templates/pageview.html',
                    controller: 'PageviewCtrl'
                  });
          // if none of the above states are matched, use this as the fallback
//  $urlRouterProvider.otherwise('/login');
          $urlRouterProvider.otherwise('/login');
          $ionicConfigProvider.views.maxCache(0);
        });
