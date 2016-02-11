'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'link': '/'
  },
  { 'title': 'Login',
    'link': 'localhost:9000/login'
    'link': '/'},
    {'title': 'My Profile',
    'link': '/profile'}];

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
