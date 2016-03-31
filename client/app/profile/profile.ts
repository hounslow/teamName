'use strict';

angular.module('teamNameApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/profile', {
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'pc', //if necessary for interests etc.
        authenticate: true
	    });
  });
