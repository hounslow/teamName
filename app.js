/**
 * Created by BryanC on 2016-01-31.
 */

var app = angular.module('flapperNews', []);

app.controller('MainCtrl', [
    '$scope',
    function($scope){
        $scope.test = 'Hello world!';
    }]);