/**
 * Created by BryanC on 2016-02-03.
 */
var mongoose = require('mongoose');
exports.Schema = mongoose.Schema, exports.ObjectId = exports.Schema.ObjectId;
exports.ComicSchema = new mongoose.Schema({
    title: String,
    link: String,
    favorites: { type: Number, default: 0 },
    timeStamp: Date,
    comicId: exports.ObjectId,
    contributors: [{ Users: String }] //populate with a list of strings of Contributors
});
mongoose.model('Comic', exports.ComicSchema);
//# sourceMappingURL=Comics.js.map