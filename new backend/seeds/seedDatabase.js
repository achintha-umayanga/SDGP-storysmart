const mongoose = require('mongoose');
require('dotenv').config();
const MiniGame = require('../models/MiniGame');
const StoryCompletion = require('../models/StoryCompletion');
const RolePlayGame = require('../models/RolePlayGame');
const MysteryWordGame = require('../models/MysteryWordGame');
const StoryLine = require('../models/StoryLine');
const User = require('../models/User');

// Sample data
const minigamesData = [
  {
    title: "Mystery Word Game",
    description: "Guess the hidden word before time runs out!",
    image: "mystery-word.jpg",
    link: "/mystery-word-game"
  },
  {
    title: "Role Play Game",
    description: "Make choices and experience different story paths!",
    image: "role-play.jpg",
    link: "/role-play-game"
  },
  {
    title: "Story Completion Game",
    description: "Finish the story by choosing the right words!",
    image: "story-completion.jpg",
    link: "/story-completion-game"
  }
];

const storyCompletionData = {
  steps: [
    {
      text: "Alex, an aspiring young explorer, found an old, mysterious map in his grandfather's attic. It hinted at a hidden treasure deep within the Enchanted Forest. Eager to embark on an adventure, he first needed to...",
      options: [
        { text: "Pack his backpack.", correct: true, points: 20 },
        { text: "Take a nap.", correct: false, points: 0 },
        { text: "Call his friend.", correct: false, points: 0 }
      ]
    },
    {
      text: "With his bag packed and excitement in his heart, Alex entered the forest. The trees whispered secrets as he followed the trail. Suddenly, he came across a fork in the path. Should he...",
      options: [
        { text: "Take the left path, where birds are chirping.", correct: true, points: 20 },
        { text: "Take the right path, leading into darkness.", correct: false, points: 0 },
        { text: "Turn back home.", correct: false, points: 0 }
      ]
    },
    {
      text: "Following the path, Alex stumbled upon a rushing river. There was no bridge in sight, but he noticed stepping stones leading across. He decided to...",
      options: [
        { text: "Carefully step on the stones.", correct: true, points: 20 },
        { text: "Jump into the water and swim.", correct: false, points: 0 },
        { text: "Wait for someone to help.", correct: false, points: 0 }
      ]
    },
    {
      text: "Across the river, he encountered an old man sitting beside a campfire. The man offered Alex a riddle: 'The more you take, the more you leave behind. What am I?' Alex thought carefully and answered...",
      options: [
        { text: "Footsteps.", correct: true, points: 20 },
        { text: "Time.", correct: false, points: 0 },
        { text: "Gold.", correct: false, points: 0 }
      ]
    },
    {
      text: "Impressed by Alex's wit, the old man gave him a golden key and whispered, 'It unlocks the hidden chamber beneath the ancient oak tree.' Alex searched for the tree and found it standing tall. He then...",
      options: [
        { text: "Used the key on a hidden lock.", correct: true, points: 20 },
        { text: "Dug under the tree.", correct: false, points: 0 },
        { text: "Climbed the tree.", correct: false, points: 0 }
      ]
    },
    {
      text: "With a soft click, a hidden door in the tree trunk creaked open, revealing a staircase leading underground. Alex bravely stepped inside and discovered...",
      options: [
        { text: "A chest filled with gold.", correct: true, points: 20 },
        { text: "A sleeping dragon.", correct: false, points: 0 },
        { text: "A mysterious book.", correct: false, points: 0 }
      ]
    }
  ]
};

const rolePlayGameData = {
  conversationSteps: [
    {
      speaker: "Ancient Guardian",
      text: "Halt, traveler! This temple holds many secrets. Why do you seek entrance?",
      options: [
        { text: "I seek ancient knowledge and wisdom.", correct: true, points: 20 },
        { text: "I'm just a tourist looking around.", correct: false, points: 0 },
        { text: "I'm here to steal treasures.", correct: false, points: 0 }
      ]
    },
    {
      speaker: "Ancient Guardian",
      text: "The path ahead is treacherous. Which tool would you choose for your journey?",
      options: [
        { text: "An enchanted map that reveals hidden passages.", correct: true, points: 20 },
        { text: "A bag of gold to bribe my way through.", correct: false, points: 0 },
        { text: "I don't need any tools.", correct: false, points: 0 }
      ]
    },
    {
      speaker: "Ancient Guardian",
      text: "You encounter a magical seal with ancient symbols. How do you proceed?",
      options: [
        { text: "Study the symbols carefully to understand their meaning.", correct: true, points: 20 },
        { text: "Try to break through by force.", correct: false, points: 0 },
        { text: "Turn back and give up.", correct: false, points: 0 }
      ]
    },
    {
      speaker: "Ancient Guardian",
      text: "A mystical bridge appears, made of pure light. What's your approach?",
      options: [
        { text: "Test the bridge's stability with wisdom and caution.", correct: true, points: 20 },
        { text: "Run across as fast as possible.", correct: false, points: 0 },
        { text: "Look for another way around.", correct: false, points: 0 }
      ]
    },
    {
      speaker: "Ancient Guardian",
      text: "You've reached the sacred chamber. What is your final action?",
      options: [
        { text: "Bow in respect and request permission to learn.", correct: true, points: 20 },
        { text: "Grab whatever looks valuable.", correct: false, points: 0 },
        { text: "Leave immediately.", correct: false, points: 0 }
      ]
    }
  ]
};

const mysteryWordGameData = {
  words: ["MAGIC", "WORLD", "STORY", "BRIDGE", "RIDDLE"]
};

const storylineData = {
  levels: [
    {
      id: 1,
      name: "Level 1",
      unlocked: true,
      title: "Greetings & Introductions",
      description: "Learn basic greetings and how to introduce yourself in English."
    },
    {
      id: 2,
      name: "Level 2",
      unlocked: false,
      title: "Space Vocabulary",
      description: "Learn words related to space and astronomy."
    },
    {
      id: 3,
      name: "Level 3",
      unlocked: false,
      title: "Action Verbs",
      description: "Learn common action verbs through space missions."
    },
    {
      id: 4,
      name: "Level 4",
      unlocked: false,
      title: "Asking Questions",
      description: "Learn how to form questions to gather information."
    },
    {
      id: 5,
      name: "Level 5",
      unlocked: false,
      title: "Final Mission",
      description: "Use everything you've learned to complete the final mission."
    }
  ],
  characters: {
    captain: {
      name: "Captain Nova",
      color: "#4dabf7",
      avatar: "👩‍🚀"
    },
    alien: {
      name: "Zorb",
      color: "#40c057",
      avatar: "👽"
    },
    robot: {
      name: "Byte",
      color: "#f783ac",
      avatar: "🤖"
    }
  },
  levelContent: new Map([
    ["1", [
      {
        speaker: "captain",
        text: "Welcome to the StarQuest! I'm Captain Nova. What's your name?",
        choices: null,
        needsContinue: true
      },
      {
        speaker: "alien",
        text: "Hello! I'm Zorb from Planet Lexicon. We speak many languages here!",
        choices: null,
        needsContinue: true
      },
      {
        speaker: "robot",
        text: "Greetings, human! I am Byte, your robot assistant. I will help you learn English.",
        choices: null,
        needsContinue: true
      },
      {
        speaker: "robot",
        text: "Let's practice greetings! How would you respond when someone says 'Hello, how are you?'",
        choices: [
          { id: 1, text: "I'm fine, thank you. And you?", correct: true },
          { id: 2, text: "Yes, hello for you.", correct: false },
          { id: 3, text: "I am a human person.", correct: false }
        ],
        needsContinue: false
      },
      {
        speaker: "alien",
        text: "On my planet, we introduce ourselves with our name and something we like. Try it!",
        choices: [
          { id: 1, text: "My name is [name] and I like space exploration.", correct: true },
          { id: 2, text: "I am called [name].", correct: false },
          { id: 3, text: "The name is [name]. Remember it.", correct: false }
        ],
        needsContinue: false
      },
      {
        speaker: "captain",
        text: "Great! Now let's learn how to say goodbye. Which is the best way to end a conversation?",
        choices: [
          { id: 1, text: "End transmission.", correct: false },
          { id: 2, text: "Goodbye, it was nice talking to you!", correct: true },
          { id: 3, text: "I go now.", correct: false }
        ],
        needsContinue: false
      }
    ]]
  ])
};

const userData = {
  username: "demo_user",
  displayName: "Demo User",
  level: 1,
  points: 0,
  progress: {
    storyCompletion: 0,
    rolePlay: 0,
    mysteryWord: 0
  },
  completedLevels: [1]
};

// Function to seed the database
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Clear existing data
    await MiniGame.deleteMany({});
    await StoryCompletion.deleteMany({});
    await RolePlayGame.deleteMany({});
    await MysteryWordGame.deleteMany({});
    await StoryLine.deleteMany({});

    // Insert data
    await MiniGame.insertMany(minigamesData);
    await StoryCompletion.create(storyCompletionData);
    await RolePlayGame.create(rolePlayGameData);
    await MysteryWordGame.create(mysteryWordGameData);
    await StoryLine.create(storylineData);
    
    // Create a demo user if it doesn't exist
    const existingUser = await User.findOne({ username: userData.username });
    if (!existingUser) {
      await User.create(userData);
      console.log('Demo user created');
    }

    console.log('Database seeded successfully');
    
    // Close connection
    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

seedDatabase();