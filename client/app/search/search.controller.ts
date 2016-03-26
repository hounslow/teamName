'use strict';

class SearchCtrl {
  private comicsToShowDescription: string[];
  private filteredByUsernameComics : string[];

  constructor($scope, Auth, $http){
    this.isContributor = Auth.isUser;
    this.Auth = Auth;
    this.$scope = $scope;
    this.$http = $http;
    this.comicsToShowDescription = [];
    this.filteredByUsernameComics = [];
    $scope.keywords = "";
    $scope.gotResultsByTitle = true;
    $scope.gotResultsByUsername = true;
    $scope.gotResultsByTitleYes = false;
    $scope.gotResultsByUsernameYes = false;
    $scope.searchingByTitle = false;
    $scope.searchingByUsername = false;
    //$http.get('/api/comics').then(response => {
    //  this.allComics = response.data;
    //  $scope.allComics = this.allComics;
    //});
  }

  searchForComics(){
    this.$scope.gotResultsByTitle = true;
    this.$scope.gotResultsByTitleYes = false;
    this.$scope.searchingByTitle = true;
    this.$scope.testing = "";
    this.$scope.filteredComics = [];
    var obj = this;

    this.$http.get('/api/comics/search/'+this.$scope.keywords, {searchWords: this.$scope.keywords})
     .success(function (data){
       if (typeof data[0] == 'undefined') {
         obj.$scope.gotResultsByTitle = false;
         obj.$scope.gotResultsByTitleYes = false;
       } else {obj.$scope.gotResultsByTitleYes = true;}
       obj.$scope.filteredComics = data;
       obj.$scope.testing = data;
       obj.$scope.searchingByTitle = false;
     });
    //this.$http.get('/api/comics/search-username/'+this.$scope.keywords, {searchWords: this.$scope.keywords})
    //  .success(function (data){
    //    if (typeof data[0] == 'undefined') {
    //      obj.$scope.gotResults = false;
    //    }
    //    obj.$scope.filteredByUsernameComics = data;
    //    obj.$scope.testing2 = data;
    //    obj.$scope.searching = false;
    //  });
    this.searchForComicsByUsername();
  }

  searchForComicsByUsername(){
    this.$scope.gotResultsByUsername = true;
    this.$scope.searchingByUsername = true;
    this.$scope.gotResultsByUsernameYes = false;
    this.$scope.filteredByUsernameComics = [];
    this.filteredByUsernameComics = [];
    var obj = this;
    var arrayOfKeywords = this.$scope.keywords.split(" ");

    this.$http.get('/api/comics/search-username/'+this.$scope.keywords, {searchWords: this.$scope.keywords})
      .success(function (data){
        obj.$scope.testing2 = data;
        if (typeof data[0] == 'undefined') {
          obj.$scope.gotResultsByUsername = false;
          obj.$scope.gotResultsByUsernameYes = false;
          obj.$scope.searchingByUsername = false;
          return;
        }
        obj.$scope.allComics = data;
        var allComics: string[];
        allComics = data;
        for (var i = 0; i < allComics.length; i++ ){  //going through comics
          var allContributorsNames: string[];
          allContributorsNames = data[i].contributors;
          for (var b = 0; b < allContributorsNames.length; b++){  //going through contributors of a single comic
            for (var c= 0; c<arrayOfKeywords.length; c++){
              if (data[i].contributors[b].name.toLowerCase().indexOf(arrayOfKeywords[c].toLowerCase()) > -1){
                if (obj.filteredByUsernameComics.indexOf(data[i]) == -1) {  //don't allow for duplicates
                  obj.filteredByUsernameComics.push(data[i]);
                  obj.$scope.gotResultsByUsernameYes = true;
                }
              }
            }
          }
        }
        if (typeof obj.filteredByUsernameComics[0] == 'undefined') {
          obj.$scope.gotResultsByUsername = false;
          obj.$scope.searchingByUsername = false;
          return;
        }
        obj.$scope.filteredByUsernameComics = obj.filteredByUsernameComics;
        obj.$scope.searchingByUsername = false;

      });
  }

/*  testingAddContributor(){  //temporary for testing add contributor
    this.$http.post('/api/comics/'+this.me.myFavourites[0]._id + '/contributors', {contributor: this.Auth.getCurrentUser()._id});
  }*/

  deleteComic(Comic) {
    this.$http.delete('/api/Comics/' + Comic._id);
    window.location.href='/the-feed';
  };
  addToShowDescription(comicId: string){
    this.comicsToShowDescription.push(comicId);
  };

  showDescription(comicId: string):boolean{
    return (-1 != this.comicsToShowDescription.indexOf(comicId));
  };

  removeFromShowDescription(comicId: string){
    var indexOfDelete = this.comicsToShowDescription.indexOf(comicId);
    this.comicsToShowDescription.splice(indexOfDelete, 1);
  };

  addToFavourites(Comic) {
    this.$http.post('/api/users/'+this.Auth.getCurrentUser()._id + '/my-favourites', {id: this.Auth.getCurrentUser()._id, myComics: Comic._id});

    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("Comic has been added to favourites!");
    }
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Comic has been added to favourites!");
        }
      });
    }
  };
//From https://developer.mozilla.org/en/docs/Web/API/notification

}

angular.module('teamNameApp')
  .controller('SearchCtrl', SearchCtrl);

// http://icelab.com.au/articles/click-to-edit-with-angularjs/
