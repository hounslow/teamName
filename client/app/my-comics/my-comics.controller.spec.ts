'use strict';

describe('Controller: MyComicsCtrl', function () {

  // load the controller's module
  beforeEach(module('teamNameApp'));

  var MyComicsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyComicsCtrl = $controller('MyComicsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
