const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  name: String,
  color: String,
  avatar: String
});

const ChoiceSchema = new mongoose.Schema({
  id: Number,
  text: String,
  correct: Boolean
});

const ContentItemSchema = new mongoose.Schema({
  speaker: String,
  text: String,
  choices: [ChoiceSchema],
  needsContinue: Boolean
});

const LevelSchema = new mongoose.Schema({
  id: Number,
  name: String,
  unlocked: Boolean,
  title: String,
  description: String
});

const StoryLineSchema = new mongoose.Schema({
  levels: [LevelSchema],
  characters: {
    captain: CharacterSchema,
    alien: CharacterSchema,
    robot: CharacterSchema
  },
  levelContent: {
    type: Map,
    of: [ContentItemSchema]
  }
});

module.exports = mongoose.model('StoryLine', StoryLineSchema);