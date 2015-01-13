'use strict';

var _ = require('lodash');
var Opinion = require('./opinion.model');

// Get list of opinions
exports.index = function(req, res) {
  Opinion.find(function (err, opinions) {
    if(err) { return handleError(res, err); }
    return res.json(200, opinions);
  });
};

// Get a single opinion
exports.show = function(req, res) {
  Opinion.findById(req.params.id, function (err, opinion) {
    if(err) { return handleError(res, err); }
    if(!opinion) { return res.send(404); }
    return res.json(opinion);
  });
};

// Creates a new opinion in the DB.
exports.create = function(req, res) {
  Opinion.create(req.body, function(err, opinion) {
    if(err) { return handleError(res, err); }
    return res.json(201, opinion);
  });
};

// Updates an existing opinion in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Opinion.findById(req.params.id, function (err, opinion) {
    if (err) { return handleError(res, err); }
    if(!opinion) { return res.send(404); }
    var updated = _.merge(opinion, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, opinion);
    });
  });
};

// Deletes a opinion from the DB.
exports.destroy = function(req, res) {
  Opinion.findById(req.params.id, function (err, opinion) {
    if(err) { return handleError(res, err); }
    if(!opinion) { return res.send(404); }
    opinion.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}