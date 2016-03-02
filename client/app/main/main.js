'use strict';
angular.module('teamNameApp')
    .config(function ($routeProvider) {
    $routeProvider
        .when('/main', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
    });
});
//# sourceMappingURL=main.js.map