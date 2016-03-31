'use strict';

angular.module('teamNameApp')
  .config(function ($routeProvider) {
    $routeProvider
      //.when('/', {
      //  templateUrl: 'app/login/login.html',
      //  controller: 'LoginCtrl',
      //  controllerAs: 'vm'
      //})
      .when('/login', {
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl',
      controllerAs: 'vm'
      })
      .when('/logout', {
        name: 'logout',
        referrer: '/login', //I changed from / to login
        template: '',
        controller: function($location, $route, Auth) {
          var referrer = $route.current.params.referrer ||
                          $route.current.referrer ||
                          '/login';              //I changed from / to login
          Auth.logout();
          $location.path(referrer); //bring to login
        }
      });
  })
  .run(function($rootScope) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if (next.name === 'logout' && current && current.originalPath && !current.authenticate) {
        next.referrer = current.originalPath;
      }
    });
  });
