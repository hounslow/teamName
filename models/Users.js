var mongoose = require('mongoose');
var crypto = require('crypto');
exports.UserSchema = new mongoose.Schema({
    name: String,
    //hash: string,
    //salt: string,
    Contributer: { type: Boolean, default: false }
});
exports.repository = mongoose.model("UserSchema", exports.UserSchema);
exports.UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};
exports.UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};
mongoose.model('User', exports.UserSchema);
