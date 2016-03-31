'use strict';




class EditCtrl {
  constructor($scope, Auth, $http, comic, $window) {
    this.Auth = Auth;
    this.$scope = $scope;
    this.$http = $http;
    this.comic = comic;
    $http.get('api/Comics/' + comic.getComic()).success(function(data){$scope.Comics  = data});
    $scope.PageNumber = [];
    $scope.newFileString = [];

  }

  setPageNumber(index){
  $scope.pageNumber.push(index);
  console.log(index);
};

  deleteCell(){
  $scope.newFileString = $scope.Comics.content;
  /*      for (var i = 0; i < $scope.pageNumber.length; i++){
   if ($scope.pageNumber[i] < $scope.pageNumber[i+1])
   $scope.pageNumber[i+1] = $scope.pageNumber[i]-1;*/
  $scope.newFileString.splice($scope.pageNumber[0],1);
  $scope.pageNumber = [];
};

  callBack(obj){
  $scope.newFileString.push(obj);
};

  addCell(){
  $scope.newFileString = $scope.Comics.content;
  var file    = document.querySelector(".test").files[0];
  var fileReader = new FileReader;
  var func = this;
  fileReader.onloadend = function(e){
    func.callBack(e.target.result);
  };

  if (file){
    fileReader.readAsDataURL(file);
  }
};

  save(){
  $scope.newFileString = $scope.Comics.content;
  var func = this;
  $http.put('/api/Comics/' + $scope.TestComic , {content: $scope.newFileString, notSaved: false}).success(function(){
    func.window.location.href='/the-feed';
  })
};

  swapCell(){
  $scope.newFileString = $scope.Comics.content;
  var temp = $scope.newFileString[$scope.pageNumber[0]];
  $scope.newFileString[$scope.pageNumber[0]] = $scope.newFileString[$scope.pageNumber[1]];
  $scope.newFileString[$scope.pageNumber[1]] = temp;
  $scope.pageNumber = [];
};

  moveCell(){
  $scope.newFileString = $scope.Comics.content;
  var temp = $scope.newFileString[$scope.pageNumber[0]];
  if ($scope.pageNumber[0] > $scope.pageNumber[1]){
    $scope.pageNumber[1] += 1;
  }
  $scope.newFileString.splice($scope.pageNumber[1],0, temp);
  $scope.newFileString.splice($scope.pageNumber[0],1);
  $scope.pageNumber = [];
};

  publish(){
  $scope.newFileString = $scope.Comics.content;
  console.log($scope.newFileString.length);
  $http.put('/api/Comics/' + $scope.TestComic , {content: $scope.newFileString, notSaved: true}).success(function(){
    window.location.href='/the-feed';
  })
}
}





angular.module('teamNameApp')
  .controller('EditCtrl', EditCtrl);

