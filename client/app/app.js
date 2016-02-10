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
  'ui.router',
  'validation.match'
])
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .otherwise({redirectTo: '/' });
});
//# sourceMappingURL=app.js.map
