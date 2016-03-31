'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import {Schema} from 'mongoose';


var ComicSchema = new mongoose.Schema({
    content: [String],
    name: {
      type: String
    },
    date: { type: Date, default: Date.now },
    contributors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    description: {
      type: String
    },
    notSaved: Boolean
});
ComicSchema.index({description: 'text', name: 'text' });


module.exports = mongoose.model('Comic', ComicSchema);
