'use strict';

angular.module('teamNameApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
<<<<<<< HEAD
<<<<<<< HEAD
        templateUrl: 'app/register/register.html',
        controller: angular.noop//,
=======
        templateUrl: 'app/the-feed/the-feed.html',
        controller: 'TheFeedCtrl'
>>>>>>> 52350c58d454a255350debbd5e43fd3d239e3e32
=======
        templateUrl: 'app/login/login.html',
        controller: angular.noop
>>>>>>> ddf46243120d152db6785f0884cc65f6b8e20b78
        //controllerAs: 'MainControllerAs'
      });
  });
