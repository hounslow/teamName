/**
 * Comic model events
 */

'use strict';

import {EventEmitter} from 'events';
var Comic = require('./Comic.model');
var ComicEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ComicEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Comic.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ComicEvents.emit(event + ':' + doc._id, doc);
    ComicEvents.emit(event, doc);
  }
}

export default ComicEvents;
