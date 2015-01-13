/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Idea = require('../api/idea/idea.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function(err, first, second) {
      console.log('finished populating users');
      Idea.find({}).remove(function() {
        Idea.create({
          name: "Idea 1",
          owner: first._id,
          keywords: ["keyword1", "keyword2"],
          summary: "This is the first keyword",
          overview_url: "http://placehold.it/300x300"
        })
      })
    }
  );
});
