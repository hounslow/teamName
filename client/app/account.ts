'use strict';

angular.module('teamNameApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/login2/login2.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .when('/login2', {
        templateUrl: 'app/login2/login2.html',
        controller: 'LoginController',
      controllerAs: 'vm'
      })
      .when('/logout', {
        name: 'logout',
        referrer: '/login2', //I changed from / to login
        template: '',
        controller: function($location, $route, Auth) {
          var referrer = $route.current.params.referrer ||
                          $route.current.referrer ||
                          '/login2';              //I changed from / to login
          Auth.logout();
          $location.path(referrer);
        }
      });
      // .when('/signup', {
      //   templateUrl: 'app/signup/signup.html',
      //   controller: 'SignupController',
      //   controllerAs: 'vm'
      // })
      // .when('/settings', {
      //   templateUrl: 'app/settings/settings.html',
      //   controller: 'SettingsController',
      //   controllerAs: 'vm',
      //   authenticate: true
      // });
  })
  .run(function($rootScope) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if (next.name === 'logout' && current && current.originalPath && !current.authenticate) {
        next.referrer = current.originalPath;
      }
    });
  });
