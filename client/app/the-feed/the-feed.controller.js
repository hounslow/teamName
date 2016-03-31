'use strict';
var TheFeedCtrl = (function () {
    function TheFeedCtrl($scope, $http, Auth) {
        this.isContributor = Auth.isUser;
        this.Auth = Auth;
        this.$scope = $scope;
        this.$http = $http;
        this.comicsToShowDescription = [];
        // Grab the initial set of available comics
        $http.get('/api/Comics').success(function (Comics) {
            $scope.Comics = Comics;
        });
    }
    TheFeedCtrl.prototype.deleteComic = function (Comic) {
        this.$http.delete('/api/Comics/' + Comic._id);
        window.location.href = '/the-feed';
    };
    ;
    TheFeedCtrl.prototype.addToShowDescription = function (comicId) {
        this.comicsToShowDescription.push(comicId);
    };
    ;
    TheFeedCtrl.prototype.showDescription = function (comicId) {
        console.log('this should be true ' + (-1 != this.comicsToShowDescription.indexOf(comicId)));
        return (-1 != this.comicsToShowDescription.indexOf(comicId));
    };
    ;
    TheFeedCtrl.prototype.removeFromShowDescription = function (comicId) {
        console.log('zero element del' + this.comicsToShowDescription[0]);
        console.log('one element del' + this.comicsToShowDescription[1]);
        var indexOfDelete = this.comicsToShowDescription.indexOf(comicId);
        this.comicsToShowDescription.splice(indexOfDelete, 1);
        console.log('zero element after del' + this.comicsToShowDescription[0]);
        console.log('one element after del' + this.comicsToShowDescription[1]);
    };
    ;
    TheFeedCtrl.prototype.addToFavourites = function (Comic) {
        this.$http.post('/api/users/' + this.Auth.getCurrentUser()._id + '/my-favourites', { id: this.Auth.getCurrentUser()._id, myComics: Comic._id });
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        }
        else if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            var notification = new Notification("Comic has been added to favourites!");
        }
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    var notification = new Notification("Comic has been added to favourites!");
                }
            });
        }
    };
    ;
    return TheFeedCtrl;
})();
angular.module('teamNameApp')
    .controller('TheFeedCtrl', TheFeedCtrl);
