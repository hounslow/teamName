'use strict';

describe('Controller: TheFeedCtrl', function () {

  // load the controller's module
  beforeEach(module('teamNameApp'));

  var TheFeedCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TheFeedCtrl = $controller('TheFeedCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
