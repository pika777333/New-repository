const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

module.exports = mongoose.model('User', UserSchema);
