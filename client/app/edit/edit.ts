'use strict';

angular.module('teamNameApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/edit', {
        templateUrl: 'app/edit/edit.html',
        controller: 'EditCtrl',
        //authenticate: 'user',
        controllerAs: 'ec'
      });
  });
