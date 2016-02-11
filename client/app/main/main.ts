'use strict';

angular.module('teamNameApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/register/register.html',
        controller: angular.noop//,
        templateUrl: 'app/the-feed/the-feed.html',
        controller: 'TheFeedCtrl'

        templateUrl: 'app/login/login.html',
        controller: angular.noop
        //controllerAs: 'MainControllerAs'
      });
  });
