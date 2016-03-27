'use strict';

angular.module('teamNameApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/search', {
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'sc', //name of controller when referenced in html file
        authenticate: true
      });
  });
