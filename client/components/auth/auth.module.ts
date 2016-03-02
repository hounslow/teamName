'use strict';

angular.module('teamNameApp.auth', [
  'teamNameApp.constants',
  'teamNameApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
