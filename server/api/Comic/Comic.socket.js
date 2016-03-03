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


/**
 * Broadcast updates to client when the model changes
 */
/*
'use strict';

var ComicEvents = require('./Comic.events');

// Model events to emit
var events = ['save', 'remove'];

export function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('Comic:' + event, socket);

    ComicEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}


function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    ComicEvents.removeListener(event, listener);
  };
}
*/