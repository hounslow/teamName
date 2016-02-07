/**
 * Created by BryanC on 2016-02-03.
 */
import mongoose = require('mongoose');

export var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

export var ComicSchema = new mongoose.Schema({
    title: string,
    link: string,
    favorites: {type: number, default: 0},
    timeStamp: Date, //when created, associate time of creation with comic
    comicId: ObjectId, // unique identifier of the comic object
    contributors: [{Users: string}] //populate with a list of strings of Contributors
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] // do i need this???
});

mongoose.model('Comic', ComicSchema);