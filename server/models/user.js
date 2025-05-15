const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const uniqueValidatorMail = require('mongoose-unique-validator');

const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },
});

// Add unique validation for email
userSchema.plugin(uniqueValidatorMail);

// Encrypt password using bcrypt before creating a new user in db
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare entered password with hashed password in db
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
