'use strict';

angular.module('teamNameApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/register', {
        templateUrl: 'app/register/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'bm'
      });
 // })
 // .run(function($rootScope) {
 //   $rootScope.$on('$routeChangeStart', function(event, next, current) {
 //     if (next.name === 'logout' && current && current.originalPath && !current.authenticate) {
 //       next.referrer = current.originalPath;
 //     }
 //   });
});