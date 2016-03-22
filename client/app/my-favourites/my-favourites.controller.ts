'use strict';

class MyFavouritesCtrl{

  constructor(Auth, $location, $http, $scope) {
    this.Auth = Auth;
    this.$location = $location;
    this.$http = $http;
    $http.get('/api/users/me').then(response => {
      this.me = response.data;
      console.log('meeee in my favourites controller'+this.me.name);
//      console.log('my favourites controller contributors '+this.me.myFavourites[0].contributors)
      console.log('my favourites controller'+this.me.myFavourites[0].name);
      $scope.myFavourites = this.me.myFavourites;
    });
  }

  removeFromFavourites(comic){
    this.$http.delete('api/users/' + this.Auth.getCurrentUser()._id + '/my-favourites/'+comic._id)
      .success(window.location.href='/my-favourites');
    console.log('comic id in my fav controller'+comic._id);
  }

}

angular.module('teamNameApp')
  .controller('MyFavouritesCtrl', MyFavouritesCtrl);
