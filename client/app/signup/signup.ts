'use strict';

angular.module('teamNameApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/signup', {
        templateUrl: 'app/signup/signup.html',
        controller: 'SignupController',
        controllerAs: 'vm'
      });
 //  })
 // .run(function($rootScope) {
 //   $rootScope.$on('$routeChangeStart', function(event, next, current) {
 //     if (next.name === 'logout' && current && current.originalPath && !current.authenticate) {
 //       next.referrer = current.originalPath;
 //     }
 //   });
});