'use strict';

var request = require('supertest');
var app = require('../app');
var User = require('../api/user/user.model');

var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'test'
});

var loggedToken = null;

var createUser = function(callback) {
  User.find({}).remove(function() {
    user.save(function(err) {
      if (err) return callback(err);
      request(app)
        .post('/auth/local')
        .send({ email: user.email, password: user.password })
        .end(function(err, res) {
          loggedToken = res.body.token;
          callback(null);
        });
    });
  });

}

var getToken = function(callback) {
  if (loggedToken)
    return callback(err, loggedToken)
  createUser(function(err) {
    if (err)
      return callback(err);
    callback(null, loggedToken);
  })
}

var getUser = function(callback) {
  if (loggedToken)
    return callback(err, user)

  createUser(function(err) {
    if (err)
      return callback(err);
    callback(null, user);
  })
}

exports.getToken = getToken;
exports.getUser = getUser;

