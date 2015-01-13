'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IdeaSchema = new Schema({
  name: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId, ref: 'User', required: true, index: true},
  keywords: [{type: String}],
  summary: {type: String, required: true},
  overview_url: {type: String}
});

module.exports = mongoose.model('Idea', IdeaSchema);
