'use strict';

angular.module('teamNameApp')
  .config(function ($routeProvider) {
    console.log('Fuckers');
    $routeProvider
      .when('/login', {
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      });
  });
