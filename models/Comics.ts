/**
 * Created by BryanC on 2016-02-03.
 */
import mongoose = require('mongoose');

export var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

export var ComicSchema = new mongoose.Schema({
    title: String,
    link: String,
    favorites: {type: Number, default: 0},
    timeStamp: Date, //when created, associate time of creation with comic
    comicId: ObjectId, // unique identifier of the comic object
    contributors: [{Users: String}] //populate with a list of strings of Contributors
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] // do i need this???
});

mongoose.model('Comic', ComicSchema);