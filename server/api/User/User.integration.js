'use strict';

var app = require('../..');
import request from 'supertest';

var newUser;

describe('User API:', function() {

  describe('GET /api/Users', function() {
    var Users;

    beforeEach(function(done) {
      request(app)
        .get('/api/Users')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Users = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      Users.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/Users', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/Users')
        .send({
          name: 'New User',
          info: 'This is the brand new User!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUser = res.body;
          done();
        });
    });

    it('should respond with the newly created User', function() {
      newUser.name.should.equal('New User');
      newUser.info.should.equal('This is the brand new User!!!');
    });

  });

  describe('GET /api/Users/:id', function() {
    var User;

    beforeEach(function(done) {
      request(app)
        .get('/api/Users/' + newUser._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          User = res.body;
          done();
        });
    });

    afterEach(function() {
      User = {};
    });

    it('should respond with the requested User', function() {
      User.name.should.equal('New User');
      User.info.should.equal('This is the brand new User!!!');
    });

  });

  describe('PUT /api/Users/:id', function() {
    var updatedUser;

    beforeEach(function(done) {
      request(app)
        .put('/api/Users/' + newUser._id)
        .send({
          name: 'Updated User',
          info: 'This is the updated User!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUser = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUser = {};
    });

    it('should respond with the updated User', function() {
      updatedUser.name.should.equal('Updated User');
      updatedUser.info.should.equal('This is the updated User!!!');
    });

  });

  describe('DELETE /api/Users/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/Users/' + newUser._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when User does not exist', function(done) {
      request(app)
        .delete('/api/Users/' + newUser._id)
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
