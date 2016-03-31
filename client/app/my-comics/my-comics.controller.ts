'use strict';

class MyComicsCtrl {
  private comicsToShowDescription: string[];

  constructor($scope, $http, Auth, comic, $location){
    this.isContributor = Auth.isUser;
    this.Auth = Auth;
    this.$scope = $scope;
    this.$http = $http;
    this.$location = $location;
    $scope.noComics = false;
    $scope.loadingComics = true;
    this.comic = comic;
    this.comicsToShowDescription = [];
    // Grab the initial set of available comics
    $http.get('/api/users/me').then(response => {
      this.me = response.data;
      $scope.Comics = this.me.myComics;
      if (this.me.myComics[0] == undefined){
        $scope.noComics = true;
      }
      $scope.loadingComics = false;
    });
  }

  editComic(Comic){
    //console.log(this.Auth.getCurrentUser()._id);
    this.$http.post('/api/Comics/' + Comic._id + '/contributors' ,{contributors: this.Auth.getCurrentUser()._id, notSaved: false});
    this.$http.post('api/users/' + this.Auth.getCurrentUser()._id + '/my-comics', {id: this.Auth.getCurrentUser()._id, myComics: Comic._id});
    this.comic.setComic(Comic._id);
    this.$location.path('/edit');
  }



  deleteComic(Comic) {
    this.$http.delete('/api/Comics/' + Comic._id);
    window.location.href='/my-favourites';
  };
  addToShowDescription(comicId: string){
    this.comicsToShowDescription.push(comicId);
  };

  showDescription(comicId: string):boolean{
    console.log('this should be true '+ (-1 != this.comicsToShowDescription.indexOf(comicId)));
    return (-1 != this.comicsToShowDescription.indexOf(comicId));
  };

  removeFromShowDescription(comicId: string){
    console.log('zero element del'+ this.comicsToShowDescription[0]);
    console.log('one element del'+ this.comicsToShowDescription[1]);
    var indexOfDelete = this.comicsToShowDescription.indexOf(comicId);
    this.comicsToShowDescription.splice(indexOfDelete, 1);
    console.log('zero element after del'+ this.comicsToShowDescription[0]);
    console.log('one element after del'+ this.comicsToShowDescription[1]);
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
  .controller('MyComicsCtrl', MyComicsCtrl);
