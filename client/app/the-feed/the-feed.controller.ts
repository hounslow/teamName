'use strict';

angular.module('teamNameApp')
/* .factory('Comics', ['$http',
  function($http) {
    var o = {
      Comics : []
    };

    o.getAll = function() {
      return $http.get('/api/Comics').success(function(data) {
        angular.copy(data, o.Comics);
      });
    };
  return o}])*/

  .controller('TheFeedCtrl', function ($scope,$http, $window) {
    // Grab the initial set of available comics
    //$scope.data = Data;
    //$scope.Comics = Comics.getAll();
    $http.get('/api/Comics').success(function(Comics) {
      $scope.Comics = Comics});

    $scope.deleteComic = function(Comic){
      $http.delete('/api/Comics/' + Comic._id);
      $window.location.href='/the-feed';
    };

/*    $scope.viewComic = function(Comic){
      $http.get('/api/Comics').success(function(Comics) {
        $scope.Comicss = Comics});
      $window.location.href='/comic-window';
      $scope.Cool = 'Crazy Shit';
    }*/


  });
