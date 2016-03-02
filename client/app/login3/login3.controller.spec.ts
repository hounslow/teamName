'use strict';

describe('Controller: LoginCtrl3', function () {

  // load the controller's module
  beforeEach(module('teamNameApp'));

  var LoginCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl3', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
