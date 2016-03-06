'use strict';

angular.module('teamNameApp', [
  'teamNameApp.auth',
  'teamNameApp.admin',
  'teamNameApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/login' //I changed to login
      });

    $locationProvider.html5Mode(true);
  });
