'use strict';
/*
angular.module('teamNameApp')
  .controller('TheFeedCtrl', function ($scope, $http, $window, Auth) {
    // Grab the initial set of available comics
    $http.get('/api/Comics').success(function(Comics) {
      $scope.Comics = Comics});

    $scope.deleteComic = function(Comic){
      $http.delete('/api/Comics/' + Comic._id);
      $window.location.href='/the-feed';
    }

  });
*/
class TheFeedCtrl {
  constructor($scope, $http, Auth){
    this.isContributor = Auth.isUser;
    console.log('aaaaaaaaaaaaa in isContributor');
    console.log('isuser       '+Auth.isUser);
    this.$scope = $scope;
    this.$http = $http;
    // Grab the initial set of available comics
    $http.get('/api/Comics').success(function(Comics) {
      $scope.Comics = Comics});
  }
  deleteComic(Comic) {
      this.$http.delete('/api/Comics/' + Comic._id);
      window.location.href='/the-feed';
  };
}

angular.module('teamNameApp')
  .controller('TheFeedCtrl', TheFeedCtrl);
