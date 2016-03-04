'use strict';

angular.module('teamNameApp')
  .controller('TheFeedCtrl', function ($scope, $http, $window) {
    // Grab the initial set of available comics
    $http.get('/api/Comics').success(function(Comics) {
      $scope.Comics = Comics});

    $scope.deleteComic = function(Comic){
      $http.delete('/api/Comics/' + Comic._id);
      $window.location.href='/the-feed';
    }
  });
