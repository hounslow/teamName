'use strict';

angular.module('teamNameApp')
  .controller('ProfileCtrl', function ($scope) {
    $scope.message = 'Hello';
    $scope.title = "Welcome to this demo!";
    $scope.editorEnabled = false;

    $scope.enableEditor = function() {
      $scope.editorEnabled = true;
      $scope.editableTitle = $scope.title;
      $scope.editableMessage = $scope.message;
      $scope.editableInterests = $scope.interests;
    };

    $scope.disableEditor = function() {
      $scope.editorEnabled = false;
    };

    $scope.save = function() {
      $scope.message = $scope.editableMessage;
      $scope.title = $scope.editableTitle;
      $scope.interests = $scope.editableInterests;
      $scope.disableEditor();
    };


  });

// http://icelab.com.au/articles/click-to-edit-with-angularjs/
