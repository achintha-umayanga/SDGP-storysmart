const express = require('express');
const router = express.Router();
const MiniGame = require('../models/MiniGame');
const StoryCompletion = require('../models/StoryCompletion');
const RolePlayGame = require('../models/RolePlayGame');
const MysteryWordGame = require('../models/MysteryWordGame');

// Get all minigames
router.get('/', async (req, res) => {
  try {
    const minigames = await MiniGame.find();
    res.json(minigames);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get story completion game content
router.get('/story-completion', async (req, res) => {
  try {
    const storyCompletion = await StoryCompletion.findOne();
    res.json(storyCompletion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get role play game content
router.get('/role-play', async (req, res) => {
  try {
    const rolePlayGame = await RolePlayGame.findOne();
    res.json(rolePlayGame);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get mystery word game content
router.get('/mystery-word', async (req, res) => {
  try {
    const mysteryWordGame = await MysteryWordGame.findOne();
    res.json(mysteryWordGame);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;