'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var ComicCtrlStub = {
  index: 'ComicCtrl.index',
  show: 'ComicCtrl.show',
  create: 'ComicCtrl.create',
  update: 'ComicCtrl.update',
  destroy: 'ComicCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ComicIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './Comic.controller': ComicCtrlStub
});

describe('Comic API Router:', function() {

  it('should return an express router instance', function() {
    ComicIndex.should.equal(routerStub);
  });

  describe('GET /api/Comics', function() {

    it('should route to Comic.controller.index', function() {
      routerStub.get
        .withArgs('/', 'ComicCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/Comics/:id', function() {

    it('should route to Comic.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'ComicCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/Comics', function() {

    it('should route to Comic.controller.create', function() {
      routerStub.post
        .withArgs('/', 'ComicCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/Comics/:id', function() {

    it('should route to Comic.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'ComicCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/Comics/:id', function() {

    it('should route to Comic.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'ComicCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/Comics/:id', function() {

    it('should route to Comic.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'ComicCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
