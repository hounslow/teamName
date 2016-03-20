'use strict';

class TheFeedCtrl {
  constructor($scope, $http, Auth){
    this.isContributor = Auth.isUser;
    this.Auth = Auth;
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

  addToFavourites(Comic) {
    this.$http.post('/api/users/'+this.Auth.getCurrentUser()._id + '/my-favourites', {id: this.Auth.getCurrentUser()._id, myComics: Comic._id});
  };


}

angular.module('teamNameApp')
  .controller('TheFeedCtrl', TheFeedCtrl);
