'use strict';

class MyFavouritesCtrl{

  constructor(Auth, $location, $http, $scope) {
    this.Auth = Auth;
    this.$location = $location;
    $http.get('/api/users/me').then(response => {
      this.me = response.data;
      console.log('meeee in my favourites controller'+this.me.name);
//      console.log('my favourites controller contributors '+this.me.myFavourites[0].contributors)
      console.log('my favourites controller'+this.me.myFavourites[0].name);
      $scope.myFavourites = this.me.myFavourites;
    });
  }


}

angular.module('teamNameApp')
  .controller('MyFavouritesCtrl', MyFavouritesCtrl);
