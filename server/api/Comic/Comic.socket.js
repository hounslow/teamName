/**
 * Created by Nicholas on 2016-02-10.
 */

'use strict';

var Comic = require('./Comic.model');

exports.register = function(socket) {
  Comic.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Comic.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  //Comic.populate(doc, 'name', function (err, Comic) {
    socket.emit('Comic:save', Comic);
  }


function onRemove(socket, doc, cb) {
  socket.emit('Comic:remove', doc);
}
