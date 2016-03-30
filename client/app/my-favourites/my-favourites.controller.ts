'use strict';

class MyFavouritesCtrl{
   private comicsToShowDescription: string[];


  constructor(Auth, $location, $http, $scope, comic) {
    this.isContributor = Auth.isUser;
    this.Auth = Auth;
    this.$location = $location;
    this.$http = $http;
    this.comic = comic;
    this.comicsToShowDescription = [];
    $http.get('/api/users/me').then(response => {
      this.me = response.data;
//      if (this.me.myFavorites != null) {
        console.log('meeee in my favourites controller' + this.me.name);
//      console.log('my favourites controller contributors '+this.me.myFavourites[0].contributors)
//        console.log('my favourites controller' + this.me.myFavourites[0].name);
//      }
      function checkSaved(obj){
        if (obj.notSaved == true){
        return obj;}
      }

      $scope.myFavourites = this.me.myFavourites;
      $scope.newShit = $scope.myFavourites.filter(checkSaved);
    });
  }

  addToShowDescription(comicId: string){
    this.comicsToShowDescription.push(comicId);
  };

  editComic(Comic){
    this.comic.setComic(Comic._id);
    console.log(this.Auth.getCurrentUser()._id);
    this.$http.post('/api/Comics/' + Comic._id + '/contributors' ,{contributors: this.Auth.getCurrentUser()._id, notSaved: false});
    this.$http.post('api/users/' + this.Auth.getCurrentUser()._id + '/my-comics', {id: this.Auth.getCurrentUser()._id, myComics: Comic._id});
    //window.location.href='/create-a-comic';
  }

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

  removeFromFavourites(comic: string){
    console.log('comic id in my fav controller beforeeeeee '+comic._id);
    this.$http.delete('api/users/' + this.Auth.getCurrentUser()._id + '/my-favourites/'+comic._id)
      .success(function(){window.location.href='/my-favourites'});
    console.log('comic id in my fav controller'+comic._id);
  }

}

angular.module('teamNameApp')
  .controller('MyFavouritesCtrl', MyFavouritesCtrl);
