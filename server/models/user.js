const {Schema} = require('mongoose');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    index: true,
    required: true
  },
  username: {
    type: String,
    index: { unique: true },
    trim: true,
    required: true
  }
});

const SALT_FACTOR = 10;
UserSchema.pre('save', function(next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


const User = mongoose.model('User', UserSchema);
module.exports = User;
