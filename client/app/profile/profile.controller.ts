'use strict';

angular.module('teamNameApp')
  .controller('ProfileCtrl', function ($scope) {
    $scope.name = "Welcome to this demo!";
    $scope.personalWeb = "What/'s you website";
    $scope.interests = "Something";
    $scope.editorEnabled = false;

    $scope.enableEditor = function() {
      $scope.editorEnabled = true;
      $scope.editableName = $scope.name;
      $scope.editablePersonalWeb = $scope.personalWeb;
      $scope.editableInterests = $scope.interests;
    };

    $scope.disableEditor = function() {
      $scope.editorEnabled = false;
    };

    $scope.save = function() {
      $scope.personalWeb = $scope.editablePersonalWeb;
      $scope.name = $scope.editableName;
      $scope.interests = $scope.editableInterests;
      $scope.disableEditor();
    };


  });

// http://icelab.com.au/articles/click-to-edit-with-angularjs/
