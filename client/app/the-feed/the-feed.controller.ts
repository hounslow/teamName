'use strict';

angular.module('teamNameApp')
  .controller('TheFeedCtrl', function ($scope, $http) {
    // Grab the initial set of available comics
    $http.get('/api/Comics').success(function(Comics) {
      $scope.Comics = Comics});
  });
