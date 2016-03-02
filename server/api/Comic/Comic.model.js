'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));



var ComicSchema = new mongoose.Schema({
    content: [String],
    name: String,
    date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Comic', ComicSchema);
