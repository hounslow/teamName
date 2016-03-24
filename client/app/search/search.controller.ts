'use strict';

class SearchCtrl {
  constructor($scope, Auth, $http){
    this.Auth = Auth;
    this.$scope = $scope;
    this.$http = $http;
    $http.get('/api/users/me').then(response => {
      this.me = response.data;
      $scope.pic = this.me.myFavourites[0];
    });
  }

  testingAddContributor(){  //temporary for testing add contributor
    this.$http.post('/api/comics/'+this.me.myFavourites[0]._id + '/contributors', {contributor: this.Auth.getCurrentUser()._id});
  }

}

angular.module('teamNameApp')
  .controller('SearchCtrl', SearchCtrl);

// http://icelab.com.au/articles/click-to-edit-with-angularjs/
