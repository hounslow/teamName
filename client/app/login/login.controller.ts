'use strict';

class LoginCtrl {
  constructor(Auth, $location) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$location = $location;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to home
        this.$location.path('/');
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }
}

/*
class LoginCtrl {
  constructor($scope) {
    $scope.message = 'Hiiiiii';
  }
  
   $scope.getProducts = function() {
   $http.get('api/products').                       //potentially for going through images and showing them
   success(function(data) {
   $scope.products = data;
   for(var i = 0; i < $scope.products.length; i++) {
   $scope.getImages($scope.products[i]);
   }
   });

   $scope.getImages = function( product ) {
   $http.get( 'api/images/scan/' + product.Id ).
   success( function( data ) {
   product.images = data;
   });
   };
*/

angular.module('teamNameApp')
  .controller('LoginCtrl', LoginCtrl);

/*   Above is equivalent to below
 angular.module('teamNameApp')
 .controller('LoginCtrl', function ($scope) {
 $scope.message = 'Hello';
 });
 */
