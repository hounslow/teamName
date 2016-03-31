'use strict';

class SearchCtrl {
  private comicsToShowDescription: string[];
  private filteredByUsernameComics : string[];
  private filteredByTitleComics : string[];
  private allComics: string[];

  constructor($scope, Auth, $http){
    this.isContributor = Auth.isUser;
    this.Auth = Auth;
    this.$scope = $scope;
    this.$http = $http;
    this.comicsToShowDescription = [];
    this.filteredByUsernameComics = [];
    this.filteredByTitleComics = [];
    $scope.keywords = "";
    $scope.gotResultsByTitle = true;
    $scope.loading = true;
    $scope.gotResultsByUsername = true;
    $scope.gotResultsByTitleYes = false;
    $scope.gotResultsByUsernameYes = false;
    $scope.searchingByTitle = false;
    $scope.searchingByUsername = false;
    $scope.noComicsExist = false;
    $http.get('/api/comics').then(response => {
      this.allComics = response.data;
      $scope.allComics = this.allComics;
      if (typeof this.allComics[0] == 'undefined'){
        $scope.noComicsExist = true;
      }
      $scope.loading = false;
    });
  }

  searchForComics(){
    if(this.$scope.searchingByTitle || this.$scope.searchingByUsername || this.$scope.noComicsExist) {
      console.log("in search for comics reject");
      console.log(this.$scope.searchingByTitle);
      console.log(this.$scope.searchingByUsername);
      console.log(this.$scope.noComicsExist);
      return;
    }
    this.$scope.gotResultsByTitle = true;
    this.$scope.searchingByTitle = true;
    this.$scope.gotResultsByTitleYes = false;
    this.$scope.filteredByTitleComics = [];
    this.filteredByTitleComics = [];
    var arrayOfKeywords = this.$scope.keywords.split(" ");

    for (var i = 0; i < this.allComics.length; i++ ){  //going through comics
        for (var c= 0; c<arrayOfKeywords.length; c++){
          if (this.allComics[i].name.toLowerCase().indexOf(arrayOfKeywords[c].toLowerCase()) > -1){
            if (this.filteredByTitleComics.indexOf(this.$scope.allComics[i]) == -1) {  //don't allow for duplicates
              this.filteredByTitleComics.push(this.allComics[i]);
              this.$scope.gotResultsByTitleYes = true;
              console.log('should be first');
            }
          }
        }
    }
    if (typeof this.filteredByTitleComics[0] == 'undefined') {
      this.$scope.gotResultsByTitle = false;
      this.$scope.searchingByTitle = false;
      this.searchForComicsByUsername();
      return;
    }
    this.$scope.filteredByTitleComics = this.filteredByTitleComics;
    this.$scope.searchingByTitle = false;
    console.log('should be second');
    //this.$http.get('/api/comics/search/'+this.$scope.keywords, {searchWords: this.$scope.keywords})  //would still work, back end still there
    // .success(function (data){
    //   if (typeof data[0] == 'undefined') {
    //     obj.$scope.gotResultsByTitle = false;
    //     obj.$scope.gotResultsByTitleYes = false;
    //   } else {obj.$scope.gotResultsByTitleYes = true;}
    //   obj.$scope.filteredComics = data;
    //   obj.$scope.testing = data;
    //   obj.$scope.searchingByTitle = false;
    // });
    this.searchForComicsByUsername();
  }

  searchForComicsByUsername(){
    console.log('should be third');
    this.$scope.gotResultsByUsername = true;
    this.$scope.searchingByUsername = true;
    this.$scope.gotResultsByUsernameYes = false;
    this.$scope.filteredByUsernameComics = [];
    this.filteredByUsernameComics = [];
    var arrayOfKeywords = this.$scope.keywords.split(" ");

    for (var i = 0; i < this.allComics.length; i++ ){  //going through comics
      var allContributorsNames: string[];
      allContributorsNames = this.allComics[i].contributors;
      for (var b = 0; b < allContributorsNames.length; b++){  //going through contributors of a single comic
        for (var c= 0; c<arrayOfKeywords.length; c++){
          if (this.allComics[i].contributors[b].name.toLowerCase().indexOf(arrayOfKeywords[c].toLowerCase()) > -1){
            if (this.filteredByUsernameComics.indexOf(this.$scope.allComics[i]) == -1) {  //don't allow for duplicates
              this.filteredByUsernameComics.push(this.allComics[i]);
              this.$scope.gotResultsByUsernameYes = true;
            }
          }
        }
      }
    }
    if (typeof this.filteredByUsernameComics[0] == 'undefined') {
      this.$scope.gotResultsByUsername = false;
      this.$scope.searchingByUsername = false;
      return;
    }
    this.$scope.filteredByUsernameComics = this.filteredByUsernameComics;
    this.$scope.searchingByUsername = false;

    //this.$http.get('/api/comics/search-username/'+this.$scope.keywords, {searchWords: this.$scope.keywords})
    //  .success(function (data){
    //    obj.$scope.testing2 = data;
    //    if (typeof data[0] == 'undefined') {
    //      obj.$scope.gotResultsByUsername = false;
    //      obj.$scope.gotResultsByUsernameYes = false;
    //      obj.$scope.searchingByUsername = false;
    //      return;
    //    }
    //    obj.$scope.allComics = data;
    //    var allComics: string[];
    //    allComics = data;
    //    for (var i = 0; i < allComics.length; i++ ){  //going through comics
    //      var allContributorsNames: string[];
    //      allContributorsNames = data[i].contributors;
    //      for (var b = 0; b < allContributorsNames.length; b++){  //going through contributors of a single comic
    //        for (var c= 0; c<arrayOfKeywords.length; c++){
    //          if (data[i].contributors[b].name.toLowerCase().indexOf(arrayOfKeywords[c].toLowerCase()) > -1){
    //            if (obj.filteredByUsernameComics.indexOf(data[i]) == -1) {  //don't allow for duplicates
    //              obj.filteredByUsernameComics.push(data[i]);
    //              obj.$scope.gotResultsByUsernameYes = true;
    //            }
    //          }
    //        }
    //      }
    //    }
    //    if (typeof obj.filteredByUsernameComics[0] == 'undefined') {
    //      obj.$scope.gotResultsByUsername = false;
    //      obj.$scope.searchingByUsername = false;
    //      return;
    //    }
    //    obj.$scope.filteredByUsernameComics = obj.filteredByUsernameComics;
    //    obj.$scope.searchingByUsername = false;
    //  });
  }

  deleteComic(Comic) {
    this.$http.delete('/api/Comics/' + Comic._id);
    window.location.href='/search';
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
