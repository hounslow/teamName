'use strict';

describe('Service: comicService', function () {

  // load the service's module
  beforeEach(module('teamNameApp'));

  // instantiate service
  var comicService;
  beforeEach(inject(function (_comicService_) {
    comicService = _comicService_;
  }));

  it('should do something', function () {
    expect(!!comicService).toBe(true);
  });

});
