/**
 * Created by BryanC on 2016-02-03.
 */
var mongoose = require('mongoose');

var ComicSchema = new mongoose.Schema({
    title: String,
    link: String,
    favorites: {type: Number, default: 0},
    timeStamp: Integer, //when created, associate time of creation with comic
    contributors: [listSchema], //populate with a list of strings of Contributors
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

mongoose.model('Comic', ComicSchema);