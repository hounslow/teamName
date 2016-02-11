'use strict';

angular.module('teamNameApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.onUploadSelect = function($files) {
      $scope.newComic = $files[0].name;
    };

    // Grab the initial set of available comments
    $http.get('/api/Comics').success(function(Comics) {
      $scope.Comics = Comics;

      // Update array with any new or deleted items pushed from the socket
      socket.syncUpdates('Comic', $scope.Comics, function(event, Comic, Comics) {
        // This callback is fired after the comments array is updated by the socket listeners

        // sort the array every time its modified
        Comics.sort(function(a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a>b ? -1 : a<b ? 1 : 0;
        });
      });
    });

    // Clean up listeners when the controller is destroyed
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('Comic');
    });

    // Use our rest api to post a new comment
    $scope.addComic = function() {
      $http.post('/api/Comics', { content: $scope.newComic });
      $scope.newComic = '';
    };
  });


