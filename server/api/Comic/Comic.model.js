'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ComicSchema = new mongoose.Schema({
  name: {type:String,required:true},
  photo: Buffer,
  active: Boolean
});

export default mongoose.model('Comic', ComicSchema);
