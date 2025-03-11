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

const StoryStepSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  options: {
    type: [OptionSchema],
    required: true
  }
});

const StoryCompletionSchema = new mongoose.Schema({
  steps: {
    type: [StoryStepSchema],
    required: true
  }
});

module.exports = mongoose.model('StoryCompletion', StoryCompletionSchema);