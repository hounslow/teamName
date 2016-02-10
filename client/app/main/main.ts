'use strict';

angular.module('teamNameApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/the-feed/the-feed.html',
        controller: angular.noop
        //controllerAs: 'MainControllerAs'
      });
  });
