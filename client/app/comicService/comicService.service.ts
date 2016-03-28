'use strict';

/*angular.module('teamNameApp')
  .service('comicService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var objectValue = {
      data: []
    };

    return {getComics: function() {$http.get('/api/Comics').success(function(Comics) {
      objectValue.data = Comics;
    })}}
  });*/

(function() {

  function ComicService() {
    var comicObj = '';
    var string = '';
    var comic = {
      setString(value) {string = value},
      setComic(comicV)  {comicObj = comicV},
      getString() {return string},
      getComic() {return comicObj}
      };

    return comic;

  }

  angular.module('teamNameApp.comic', [])
    .service('comic', ComicService);

})();
