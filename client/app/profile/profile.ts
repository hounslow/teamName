'use strict';

angular.module('teamNameApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/profile', {
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl',
        authenticate: true
	    });
  });
