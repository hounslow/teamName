'use strict';

angular.module('teamNameApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/my-comics', {
        templateUrl: 'app/my-comics/my-comics.html',
        controller: 'MyComicsCtrl',
        controllerAs: 'mc',
        authenticate: 'user'
	    });
  });
