'use strict';

angular.module('teamNameApp')
  .controller('SignupCtrl', ['$scope', 'Auth', function($scope, Auth) {
    $scope.signup = function() {
      Auth.signup({
        email: $scope.email,
      password: $scope.password
    });
      };
  }]);
