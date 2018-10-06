const mongoose = require("mongoose");
const { Schema } = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    minlength: [4, 'Name must have at least 4 characters'],
    maxlength: [70, 'Name cannot contain more than 70 characters']
  },
  email: { type:String,
    required: [true, 'Username is required'],
    unique: [true, 'An account with this email already exists. Please login.']
  },
  hash: String ,
  salt: String ,
  city: { type: Schema.Types.ObjectId, ref: 'City' },
  admin: { type: Boolean, default: false }
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password){
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UserSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};



const User = mongoose.model("User", UserSchema);
module.exports = User;