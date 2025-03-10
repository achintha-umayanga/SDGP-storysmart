const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  correct: {
    type: Boolean,
    required: true
  },
  points: {
    type: Number,
    required: true
  }
});

const ConversationStepSchema = new mongoose.Schema({
  speaker: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  options: {
    type: [OptionSchema],
    required: true
  }
});

const RolePlayGameSchema = new mongoose.Schema({
  conversationSteps: {
    type: [ConversationStepSchema],
    required: true
  }
});

module.exports = mongoose.model('RolePlayGame', RolePlayGameSchema);