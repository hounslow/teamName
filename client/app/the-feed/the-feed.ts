'use strict';

angular.module('teamNameApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/the-feed', {
        templateUrl: 'app/the-feed/the-feed.html',
        controller: 'TheFeedCtrl'
      });
  });
