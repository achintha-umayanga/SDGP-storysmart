const express = require('express');
const router = express.Router();
const StoryLine = require('../models/StoryLine');

// Get storyline content
router.get('/', async (req, res) => {
  try {
    const storyline = await StoryLine.findOne();
    res.json(storyline);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get specific level content
router.get('/level/:id', async (req, res) => {
  try {
    const storyline = await StoryLine.findOne();
    
    if (!storyline) {
      return res.status(404).json({ message: 'Storyline not found' });
    }
    
    const levelId = parseInt(req.params.id);
    const levelContent = storyline.levelContent.get(levelId.toString());
    
    if (!levelContent) {
      return res.status(404).json({ message: 'Level content not found' });
    }
    
    res.json(levelContent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;