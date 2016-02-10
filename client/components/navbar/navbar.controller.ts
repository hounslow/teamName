'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
<<<<<<< HEAD
    'link': '/'
  },
  { 'title': 'Login',
    'link': 'localhost:9000/login'
=======
    'link': '/'},
    {'title': 'My Profile',
    'link': '/profile'}];
>>>>>>> 52350c58d454a255350debbd5e43fd3d239e3e32

  }];
  isCollapsed = true;
  //end-non-standard

  constructor($location) {
    this.$location = $location;
    }

  isActive(route) {
    return route === this.$location.path();
  }
}

angular.module('teamNameApp')
  .controller('NavbarController', NavbarController);
