'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IdeaSchema = new Schema({
  name: String,
  owner: String,
  keywords: [String],
  summary: String,
  overview_url : String
});

module.exports = mongoose.model('Idea', IdeaSchema);