'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import {Schema} from 'mongoose';


var ComicSchema:mongoose.Schema = new mongoose.Schema({
    content: [String],
    name: String,
    date: { type: Date, default: Date.now },
    contributors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    description: String
});


export var ComicModel = mongoose.model<IComic>('Comic', ComicSchema);
