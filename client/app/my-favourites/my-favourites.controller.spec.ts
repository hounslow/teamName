'use strict';

describe('Controller: MyFavouritesCtrl', function () {

  // load the controller's module
  beforeEach(module('teamNameApp'));

  var MyFavouritesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyFavouritesCtrl = $controller('MyFavouritesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
