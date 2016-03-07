'use strict';

describe('Controller: CreateAComicCtrl', function () {

  // load the controller's module
  beforeEach(module('teamNameApp'));

  var CreateAComicCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateAComicCtrl = $controller('CreateAComicCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});


