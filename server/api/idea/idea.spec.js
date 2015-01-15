'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Idea = require('./idea.model')
var helpers = require('../../helpers');

describe('GET /api/ideas', function() {

  var ideaId = null;
  var loggedToken = null;

  before(function(done) {
    Idea.find({}).remove(done);
  })

  before(function(done) {
    console.log(1)
    helpers.tests.getUser(function(err, user) {
      var idea = new Idea({
        name: "Idea 1",
        owner: user._id,
        keywords: ["keyword1", "keyword2"],
        summary: "This is the first keyword",
        overview_url: "http://placehold.it/300x300"
      })
      idea.save(function(err, saved) {
        ideaId = saved._id;
        done();
      })
    })
  })

  before(function(done) {
    helpers.tests.getToken(function(err, token) {
      if (err)
        return done(err);
      loggedToken = token;
    })
  })

  it('should respond 401 if not logged in', function(done) {
    request(app)
      .get('/api/ideas')
      .expect(401)
      .end(done);
  });

  it('should respond with new ideas', function(done) {
    request(app)
      .get('/api/ideas')
      .set('authorization', 'Bearer ' + loggedToken)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        res.body.should.be.instanceof(Object);
        res.body.category.should.be.equal("new")
        res.body.content.should.be.instanceof(Array)
      })
      .end(done);
  });

  it('should show new ideas', function(done) {
    request(app)
      .get('/api/ideas?category=hot')
      .set('authorization', 'Bearer ' + loggedToken)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        res.body.should.be.instanceof(Object)
        res.body.category.should.be.equal("hot")
        res.body.content.should.be.instanceof(Array)
      })
      .end(done);
  });

  it('should show an idea', function(done) {
    request(app)
      .get('/api/ideas/' + ideaId)
      .set('authorization', 'Bearer ' + loggedToken)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        res.body.should.be.instanceof(Object)
      })
      .end(done);
  });

  it('should return 404 for an unknown idea', function(done) {
    request(app)
      .get('/api/ideas/UNKNOWN')
      .set('authorization', 'Bearer ' + loggedToken)
      .expect(function(res) {
        // console.log("here");
        // console.log(res);
      })
      .expect(404)
      .end(done);
  });


});
