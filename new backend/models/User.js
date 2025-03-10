const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 1
  },
  points: {
    type: Number,
    default: 0
  },
  progress: {
    type: Object,
    default: {
      storyCompletion: 0,
      rolePlay: 0,
      mysteryWord: 0
    }
  },
  completedLevels: {
    type: [Number],
    default: [1]
  }
});

module.exports = mongoose.model('User', UserSchema);