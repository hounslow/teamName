'use strict';

angular.module('teamNameApp')
  .config(function ($routeProvider) {
    console.log("FCKKKKKK");
    $routeProvider
      .when('/login', {
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      });
  });
