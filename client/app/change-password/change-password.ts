'use strict';

angular.module('teamNameApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/change-password', {
        templateUrl: 'app/change-password/change-password.html',
        controller: 'ChangePasswordCtrl',
        controllerAs: 'vm'
//        authenticate: true
      });
  // })
  // .run(function($rootScope) {
  //   $rootScope.$on('$routeChangeStart', function(event, next, current) {
  //     if (next.name === 'logout' && current && current.originalPath && !current.authenticate) {
  //       next.referrer = current.originalPath;
  //     }
  //   });
  });
