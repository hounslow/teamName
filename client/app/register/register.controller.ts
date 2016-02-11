'use strict';

angular.module('teamNameApp')
  .controller('SignupCtrl', ['$scope', function($scope, ) {
    $scope.signup = function() {
        email: $scope.email,
        password: $scope.password
      };
  }]);
