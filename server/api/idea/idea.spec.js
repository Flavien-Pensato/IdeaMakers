'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var usersHelpers = require('../user/user.specHelpers')



describe('GET /api/ideas', function() {

  usersHelpers.loggedUser()

  it('should respond 401 if not logged in', function(done) {
    request(app)
      .get('/api/ideas')
      .expect(401)
      .end(done);
  });

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/ideas')
      .set('authorization', 'Bearer ' + usersHelpers.infos.token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

});
