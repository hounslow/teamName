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
    var comic = {
      setComic(comicV)  {comicObj = comicV},
      getComic() {return comicObj}
      };

    return comic;

  }

  angular.module('teamNameApp.comic', [])
    .service('comic', ComicService);

})();
