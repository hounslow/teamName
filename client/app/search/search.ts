'use strict';

angular.module('teamNameApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/search', {
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl',
        authenticate: true
      });
  });
