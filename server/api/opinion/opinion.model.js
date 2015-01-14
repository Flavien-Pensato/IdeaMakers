'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OpinionSchema = new Schema({
  owner: String,
  idea: String,
  type: {type: String, enum: ['LIKE', 'DISLIKE']}
});

module.exports = mongoose.model('Opinion', OpinionSchema);
