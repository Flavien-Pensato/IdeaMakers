'use strict';

var should = require('should');
var request = require('supertest');
var app = require('../../app');
var User = require('./user.model');

function loggedUser() {

  var server = request.agent(app);

  before(function(done) {
    User.remove(function() {
      var user = new User({
        provider: 'local',
        name: 'Fake User',
        email: 'test@test.com',
        password: 'test'
      });

      user.save(function(err) {
        if (err) return done(err);
        server
          .post('/auth/local')
          .send({ email: 'test@test.com', password: 'test' })
          .end(function(err, res) {
            var token = res.body.token;
            exports.infos.token = token;
            done();
          });
        });
      });

    })

  return server;

}

exports.infos = {}
exports.loggedUser = loggedUser;
