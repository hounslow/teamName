'use strict';

angular.module('teamNameApp')
  .controller('CreateAComicCtrl', function ($scope, $http, $window, Auth, comic) {
    //$scope.message = 'i am not amused';
    console.log(comic.getComic());
    $http.get('api/Comics/' + comic.getComic()).success(function(data){$scope.Comics  = data});
    //console.log($scope.Comics.name);
    //var value = $scope.Comics.name;
    $scope.newFileString = [];
    $scope.TestComic = comic.getComic();
    $scope.pageNumber = [];


    $scope.addComic = function() {
      var files    = document.querySelector('input[type=file]').files;
      var name = $scope.newTitle;
      var description = $scope.description;
      var fileString = [];
      for (var i = 0; i<files.length; i++)
        (function(i){
        var reader = new FileReader();
  //    reader.onloadend = function(e){
  //      fileString[i] = e.target.result;
  //      if (i == (files.length - 1)){
  //        $http.post('/api/Comics', {name: name , content: fileString, description: description, contributors: Auth.getCurrentUser()._id } );
  //        $window.location.href='/the-feed';}
  //    };
  //    reader.readAsDataURL(files[i]);
  //  })(i);}
  //});

    reader.onloadend = function(e){
      fileString[i] = e.target.result;
      if (i == (files.length - 1)){
        $http.post('/api/Comics', {name: name , content: fileString, description: description, contributors: Auth.getCurrentUser()._id, notSaved: true } )
          .success(function(comic) {
            $http.post('api/users/' + Auth.getCurrentUser()._id + '/my-comics', {id: Auth.getCurrentUser()._id, myComics: comic._id});
            $window.location.href='/the-feed';
      })}
    };
    reader.readAsDataURL(files[i]);
  })(i);};

    $scope.setPageNumber = function(index) {
      $scope.pageNumber.push(index);
      console.log(index);
    };

    $scope.deleteCell = function(){
      $scope.newFileString = $scope.Comics.content;
/*      for (var i = 0; i < $scope.pageNumber.length; i++){
        if ($scope.pageNumber[i] < $scope.pageNumber[i+1])
        $scope.pageNumber[i+1] = $scope.pageNumber[i]-1;*/
      $scope.newFileString.splice($scope.pageNumber[0],1);
      $scope.pageNumber = [];
    };

    $scope.callBack = function(obj){
      $scope.newFileString.push(obj);
    };

    $scope.addCell = function(){
      $scope.newFileString = $scope.Comics.content;
      var file    = document.querySelector(".test").files[0];
      var fileReader = new FileReader;
      fileReader.onloadend = function(e){
        $scope.callBack(e.target.result);
      };

      if (file){
      fileReader.readAsDataURL(file);
      }
    };

    $scope.save = function(){
      $scope.newFileString = $scope.Comics.content;
      $http.put('/api/Comics/' + $scope.TestComic , {content: $scope.newFileString, notSaved: false}).success(function(){
        window.location.href='/the-feed';
      })
    };

    $scope.swapCell = function(){
      $scope.newFileString = $scope.Comics.content;
      var temp = $scope.newFileString[$scope.pageNumber[0]];
      $scope.newFileString[$scope.pageNumber[0]] = $scope.newFileString[$scope.pageNumber[1]];
      $scope.newFileString[$scope.pageNumber[1]] = temp;
      $scope.pageNumber = [];
    };

    $scope.moveCell = function(){
      $scope.newFileString = $scope.Comics.content;
      var temp = $scope.newFileString[$scope.pageNumber[0]];
      if ($scope.pageNumber[0] > $scope.pageNumber[1]){
        $scope.pageNumber[1] += 1;
      }
      $scope.newFileString.splice($scope.pageNumber[1],0, temp);
      $scope.newFileString.splice($scope.pageNumber[0],1);
      $scope.pageNumber = [];
    };

    $scope.publish = function(){
      $scope.newFileString = $scope.Comics.content;
      console.log($scope.newFileString.length);
      $http.put('/api/Comics/' + $scope.TestComic , {content: $scope.newFileString, notSaved: true}).success(function(){
        window.location.href='/the-feed';
      })
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











