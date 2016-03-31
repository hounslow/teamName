'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

export const ComicSchema = new mongoose.Schema({
    content: [String],
    name: String,
    date: { type: Date, default: Date.now },
    contributors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    description: String
});

export const User