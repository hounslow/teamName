'use strict';

angular.module('teamNameApp')
  .controller('CreateAComicCtrl', function ($scope) {
    $scope.onUploadSelect = function($files) {
      $scope.newResource.newUploadName = $files[0].name;
    }
  });
