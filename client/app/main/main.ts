'use strict';

angular.module('teamNameApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
<<<<<<< HEAD
        templateUrl: 'app/register/register.html',
        controller: angular.noop//,
=======
        templateUrl: 'app/the-feed/the-feed.html',
        controller: 'TheFeedCtrl'
>>>>>>> 52350c58d454a255350debbd5e43fd3d239e3e32
        //controllerAs: 'MainControllerAs'
      });
  });
