'use strict';
angular.module('teamNameApp', [
    'teamNameApp.auth',
    //  'teamNameApp.admin',
    'teamNameApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'ngFileUpload',
    'validation.match'
])
    .config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .otherwise({
        redirectTo: '/login' //I changed, was just /
    });
    $locationProvider.html5Mode(true);
});
//# sourceMappingURL=app.js.map