'use strict';

angular.module('teamNameApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/settings', {
        templateUrl: 'app/settings/settings.html',
        controller: 'SettingsController',
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
