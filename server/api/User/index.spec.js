'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var userCtrlStub = {
  index: 'userCtrl.index',
  destroy: 'userCtrl.destroy',
  me: 'userCtrl.me',
  changePassword: 'userCtrl.changePassword',
  show: 'userCtrl.show',
  create: 'userCtrl.create'
};

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return 'authService.hasRole.' + role;
  }
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var UserIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './User.controller': UserCtrlStub
});

describe('User API Router:', function() {

  it('should return an express router instance', function() {
    UserIndex.should.equal(routerStub);
  });

  describe('GET /api/Users', function() {

    it('should route to User.controller.index', function() {
      routerStub.get
        .withArgs('/', 'UserCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/Users/:id', function() {

    it('should route to User.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'UserCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/Users', function() {

    it('should route to User.controller.create', function() {
      routerStub.post
        .withArgs('/', 'UserCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/Users/:id', function() {

    it('should route to User.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'UserCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/Users/:id', function() {

    it('should route to User.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'UserCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/Users/:id', function() {

    it('should route to User.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'UserCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
