/**
 * Created by BryanC on 2016-02-03.
 */
var mongoose = require('mongoose');

export var ComicSchema = new mongoose.Schema({
    title: String,
    link: String,
    favorites: {type: Number, default: 0},
    timeStamp: Integer, //when created, associate time of creation with comic
    contributors: [listSchema], //populate with a list of strings of Contributors
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] // do i need this???
});

var listSchema = new mongoose.Schema({
   // TODO SCHEMA FOR A LIST OF CONTRIBUTORS

});

mongoose.model('Comic', ComicSchema);