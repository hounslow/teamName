'use strict';

angular.module('teamNameApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/create-a-comic', {
        templateUrl: 'app/create-a-comic/create-a-comic.html',
        controller: 'CreateAComicCtrl'
      });
  });
