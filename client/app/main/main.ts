'use strict';

angular.module('teamNameApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'//,
        //controllerAs: 'MainControllerAs'
      });
  });
