'use strict';

class MyFavouritesCtrl{

  constructor(Auth, $location) {
    this.Auth = Auth;
    this.$location = $location;
  }


}

angular.module('teamNameApp')
  .controller('MyFavouritesCtrl', MyFavouritesCtrl);
