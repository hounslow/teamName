'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ComicSchema = new mongoose.Schema({
  name: {type:String,required:true},
  filename: String,
  photo: Buffer,
  date: { type: Date, default: Date.now },
});

ComicSchema.statics = {
  loadRecent: function(cb) {
    this.find({})
      .populate('name')
      .sort('-date')
      .limit(20)
      .exec(cb);
  }
};

module.exports = mongoose.model('Comic', ComicSchema);
