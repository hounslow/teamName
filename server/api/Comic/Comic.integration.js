'use strict';

var app = require('../..');
import request from 'supertest';

var newComic;

describe('Comic API:', function() {

  describe('GET /api/Comics', function() {
    var Comics;

    beforeEach(function(done) {
      request(app)
        .get('/api/Comics')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Comics = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      Comics.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/Comics', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/Comics')
        .send({
          name: 'New Comic',
          info: 'This is the brand new Comic!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newComic = res.body;
          done();
        });
    });

    it('should respond with the newly created Comic', function() {
      newComic.name.should.equal('New Comic');
      newComic.info.should.equal('This is the brand new Comic!!!');
    });

  });

  describe('GET /api/Comics/:id', function() {
    var Comic;

    beforeEach(function(done) {
      request(app)
        .get('/api/Comics/' + newComic._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Comic = res.body;
          done();
        });
    });

    afterEach(function() {
      Comic = {};
    });

    it('should respond with the requested Comic', function() {
      Comic.name.should.equal('New Comic');
      Comic.info.should.equal('This is the brand new Comic!!!');
    });

  });

  describe('PUT /api/Comics/:id', function() {
    var updatedComic;

    beforeEach(function(done) {
      request(app)
        .put('/api/Comics/' + newComic._id)
        .send({
          name: 'Updated Comic',
          info: 'This is the updated Comic!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedComic = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedComic = {};
    });

    it('should respond with the updated Comic', function() {
      updatedComic.name.should.equal('Updated Comic');
      updatedComic.info.should.equal('This is the updated Comic!!!');
    });

  });

  describe('DELETE /api/Comics/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/Comics/' + newComic._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Comic does not exist', function(done) {
      request(app)
        .delete('/api/Comics/' + newComic._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
