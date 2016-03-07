'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'link': '/'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor($location, Auth) {
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.isUser = Auth.isUser; //added for is user
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

angular.module('teamNameApp')
  .controller('NavbarController', NavbarController);
