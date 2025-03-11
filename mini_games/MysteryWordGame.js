const mongoose = require('mongoose');

const MysteryWordGameSchema = new mongoose.Schema({
  words: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('MysteryWordGame', MysteryWordGameSchema);