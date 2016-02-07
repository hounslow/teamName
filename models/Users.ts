import mongoose = require('mongoose');
import crypto = require('crypto');

export var UserSchema = new mongoose.Schema({
      name: String,
      //hash: string,
  	  //salt: string,
      Contributer: {type: Boolean, default: false},
});

/*
Mongoose requires use of schema definition code for 
data validation, type casting etc. This extension is
also not "ideal" right now. 
*/
export interface IUser extends mongoose.Document {
	name: String;
}

export var repository = mongoose.model("UserSchema", UserSchema);

UserSchema.methods.setPassword = function(password){ //for setting up password
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) { // for valid password
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

mongoose.model('User', UserSchema);