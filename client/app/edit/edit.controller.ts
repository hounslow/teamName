'use strict';




class EditCtrl {
  private pageNumber: number[];
  private newFileString: number[];

  constructor($scope, Auth, $http, comic) {
    this.Auth = Auth;
    this.$scope = $scope;
    this.$http = $http;
    this.comic = comic;
    $http.get('api/Comics/' + comic.getComic()).success(function(data){$scope.Comics  = data});
    $scope.pageNumber = [];
    $scope.newFileString = [];

  }

  setPageNumber(index: number){
  this.$scope.pageNumber.push(index);
  console.log(index);
};

  setSelect(){

  }


  deleteCell(){
  this.$scope.newFileString = this.$scope.Comics.content;
  this.$scope.newFileString.splice(this.$scope.pageNumber[0],1);
  this.$scope.pageNumber = [];
};

  callBack(obj){
  this.$scope.newFileString.push(obj);
};

  addCell(){
  this.$scope.newFileString = this.$scope.Comics.content;
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
  this.$scope.newFileString = this.$scope.Comics.content;
  //var func = this;
  $http.put('/api/Comics/' + this.comic.getComic() , {content: this.$scope.newFileString, notSaved: false}).success(function(){
    window.location.href='/the-feed';
  })
};

  swapCell(){
  this.$scope.newFileString = this.$scope.Comics.content;
  var temp = this.$scope.newFileString[this.$scope.pageNumber[0]];
  this.$scope.newFileString[this.$scope.pageNumber[0]] = this.$scope.newFileString[this.$scope.pageNumber[1]];
  this.$scope.newFileString[this.$scope.pageNumber[1]] = temp;
  this.$scope.pageNumber = [];
};

  moveCell(){
  this.$scope.newFileString = this.$scope.Comics.content;
  var temp = this.$scope.newFileString[this.$scope.pageNumber[0]];
  if (this.$scope.pageNumber[0] > this.$scope.pageNumber[1]){
    this.$scope.pageNumber[1] -= 1;
  }
    this.$scope.newFileString.splice(this.$scope.pageNumber[0],1);
  this.$scope.newFileString.splice(this.$scope.pageNumber[1],0, temp);
  this.$scope.pageNumber = [];
};

  cancel(){
    this.$http.put('/api/Comics/' + this.comic.getComic() + '/cancel' , {notSaved: true}).success(function(){
      window.location.href='/the-feed';
    });
  }

  publish(){
  this.$scope.newFileString = this.$scope.Comics.content;
  console.log(this.$scope.newFileString.length);
  this.$http.put('/api/Comics/' + this.comic.getComic() , {content: this.$scope.newFileString, notSaved: true}).success(function(){
    window.location.href='/the-feed';
  });
}
}





angular.module('teamNameApp')
  .controller('EditCtrl', EditCtrl);

