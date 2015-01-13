'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OpinionSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Opinion', OpinionSchema);