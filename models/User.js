const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String, // In a real app, hash passwords before saving
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  role: String,
  profile: {
    firstName: String,
    lastName: String,
    company: String,
    position: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
