/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Opinion = require('./opinion.model');

exports.register = function(socket) {
  Opinion.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Opinion.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('opinion:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('opinion:remove', doc);
}