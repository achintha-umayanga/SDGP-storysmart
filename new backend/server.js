const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas', err));

// Routes
const userRoutes = require('./routes/users');
const minigameRoutes = require('./routes/minigames');
const storylineRoutes = require('./routes/storyline');

app.use('/api/users', userRoutes);
app.use('/api/minigames', minigameRoutes);
app.use('/api/storyline', storylineRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});