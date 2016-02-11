'use strict';
angular.module('teamNameApp', [
    'teamNameApp.auth',
    'teamNameApp.admin',
    'teamNameApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'btford.socket-io',
    'ui.bootstrap',
    'validation.match'
])
    .config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
});

angular.module('teamNameApp');
app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);

//# sourceMappingURL=app.js.map
