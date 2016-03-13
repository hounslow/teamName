'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import {Schema} from 'mongoose';


var ComicSchema = new mongoose.Schema({
    content: [String],
    name: String,
    date: { type: Date, default: Date.now },
    contributors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    description: String
});


module.exports = mongoose.model('Comic', ComicSchema);
