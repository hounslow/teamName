'use strict';

angular.module('teamNameApp')
  .controller('CreateAComicCtrl', function ($scope, $http) {
    //$scope.newComment = '';
    //$scope.data = 'none';
    $scope.message = 'i am not amused';
    $scope.addComic = function() {
      var file    = document.querySelector('input[type=file]').files[0];
      var name = document.querySelector('input[type=file]').files[0].name;
      var reader = new FileReader();
      reader.onloadend = function(e){
        //$scope.data = e.target.result;
        $http.post('/api/Comics', {name: name , content:e.target.result} );
      };
      reader.readAsDataURL(file);
    }
  });
/*
    // Grab the initial set of available comments
    $http.get('/api/Comics').success(function(Comics) {
      $scope.Comics = Comics;

      // Update array with any new or deleted items pushed from the socket
      socket.syncUpdates('Comics', $scope.Comics, function(event, Comic, Comics) {
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
*/
    // Use our rest api to post a new comic
/*
    $scope.addComic = function() {
      $http.post('/api/Comics', { img: $scope.newComic });
      $scope.newComic = $files;
    };
*/











