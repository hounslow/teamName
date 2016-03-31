'use strict';

angular.module('teamNameApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/my-favourites', {
        templateUrl: 'app/my-favourites/my-favourites.html',
        controller: 'MyFavouritesCtrl',
        controllerAs: 'mf'
      });
  });
