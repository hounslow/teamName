'use strict';

angular.module('teamNameApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/register/register.html',
        controller: angular.noop//,
        //controllerAs: 'MainControllerAs'
      });
  });
