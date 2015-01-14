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

  it('should respond with new ideas', function(done) {
    request(app)
      .get('/api/ideas')
      .set('authorization', 'Bearer ' + usersHelpers.infos.token)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        res.body.should.be.instanceof(Object);
        res.body.category.should.be.equal("new")
        res.body.content.should.be.instanceof(Array)
      })
      .end(done);
  });

  var ideaId =
  it('should show new ideas', function(done) {
    request(app)
      .get('/api/ideas?category=hot')
      .set('authorization', 'Bearer ' + usersHelpers.infos.token)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        res.body.should.be.instanceof(Object)
        res.body.category.should.be.equal("hot")
        res.body.content.should.be.instanceof(Array)
        ideaId = res.body.content[0]._id;
      })
      .end(done);
  });

  it('should show an idea', function(done) {
    request(app)
      .get('/api/ideas/' + ideaId)
      .set('authorization', 'Bearer ' + usersHelpers.infos.token)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        res.body.should.be.instanceof(Object)
      })
      .end(done);
  });


});
