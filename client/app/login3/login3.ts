'use strict';

angular.module('teamNameApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login3', {
        templateUrl: 'app/login3/login3.html',
        controller: 'LoginCtrl3',
        controllerAs: 'vm'
      });
  })
 .run(function($rootScope) {
   $rootScope.$on('$routeChangeStart', function(event, next, current) {
     if (next.name === 'logout' && current && current.originalPath && !current.authenticate) {
       next.referrer = current.originalPath;
     }
   });
});
