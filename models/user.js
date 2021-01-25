const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 1,
    maxlength: 24,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 3,
    required: true
  },
  name: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
