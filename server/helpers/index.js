'use strict';

var _ = require('lodash');

var isObjectId = function(str) {
  return !!str.match(/^[0-9a-fA-F]{24}$/)
}

var handleBadRequest = function(res, err) {
  if (_.isObject(err))
    return res.send(400, err)
  else
    return res.send(400, {error: err})
}

var handleError = function(res, err) {
  return res.send(500, err);
}

var handleNotFound = function(res) {
  return res.send(404, {error: "Not found"});
}

var sendResults = function(res, wrapper) {
  return function(err, results) {
    if (err) { return handleError(res, err); }
    if (!results) { return handleNotFound(res); }
    if (wrapper)
      return res.json(200, _.assign(wrapper, {content: results}));
    else
      return res.json(200, results);
  }
}

exports.isObjectId = isObjectId;
exports.handleBadRequest = handleBadRequest;
exports.handleNotFound = handleNotFound;
exports.handleError = handleError;
exports.sendResults = sendResults;
exports.tests = require('./tests');
