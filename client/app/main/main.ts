'use strict';

angular.module('teamNameApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/login/login.html',
        /*controller:*/
        controllerAs: 'MainControllerAs'
      })
/*    .when('/create-a-comic',
      {templateUrl: 'app/create-a-comic/create-a-comic.html',
      /!*controller:*!/
      controller: 'CreateAComicCtrl'});*/
  });
