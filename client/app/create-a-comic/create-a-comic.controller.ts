'use strict';

angular.module('teamNameApp')
  .controller('CreateAComicCtrl', function ($scope, $http, $window, Auth) {
    //$scope.message = 'i am not amused';
    $scope.addComic = function() {
      var files    = document.querySelector('input[type=file]').files;
      var name = $scope.newTitle;
      var description = $scope.description;
      var fileString = [];
      for (var i = 0; i<files.length; i++)
        (function(i){
        var reader = new FileReader();
    reader.onloadend = function(e){
      fileString[i] = e.target.result;
      if (i == (files.length - 1)){
        $http.post('/api/Comics', {name: name , content: fileString, description: description, contributors: Auth.getCurrentUser()._id } )
          .success(function(comic) {
            $http.post('api/users/' + Auth.getCurrentUser()._id + '/my-comics', {id: Auth.getCurrentUser()._id, myComics: comic._id});
            $window.location.href='/the-feed';
      })}
    };
    reader.readAsDataURL(files[i]);
  })(i);}
});














