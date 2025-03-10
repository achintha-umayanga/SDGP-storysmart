const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// For testing: Create a user
router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    displayName: req.body.displayName,
    level: req.body.level || 1,
    points: req.body.points || 0,
    progress: req.body.progress || {
      storyCompletion: 0,
      rolePlay: 0,
      mysteryWord: 0
    },
    completedLevels: req.body.completedLevels || [1]
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;