'use strict';

class LoginCtrl {
  constructor($scope) {
    $scope.message = 'Hiiiiii';
  }
  /*
   $scope.getProducts = function() {                 //http://stackoverflow.com/questions/29504962/showing-images-from-different-folders-inside-ng-repeat-loop
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
}

angular.module('teamNameApp')
  .controller('LoginCtrl', LoginCtrl);

/*   Above is equivalent to below
 angular.module('teamNameApp')
 .controller('LoginCtrl', function ($scope) {
 $scope.message = 'Hello';
 });
 */
