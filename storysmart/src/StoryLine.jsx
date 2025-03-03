import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Sidebar Component
const Sidebar = ({ activeLevel, setActiveLevel, levels }) => {
  return (
    <div className="d-flex flex-column bg-dark text-white" style={{ height: '100vh', width: '280px' }}>
      {/* App Title */}
      <div className="p-3 border-bottom border-light">
        <h4 className="fw-bold text-center text-white">Story Smart</h4>
      </div>

      {/* Levels Section */}
      <div className="p-3">
        <h5 className="mb-3 text-light-emphasis border-bottom pb-2 border-light">Adventure Levels</h5>
        <div className="d-flex flex-column gap-3">
          {levels.map((level) => (
            <button
              key={level.id}
              className={`btn d-flex align-items-center ${
                activeLevel === level.id ? 'btn-success' : 
                level.unlocked ? 'btn-outline-light' : 'btn-secondary'
              }`}
              disabled={!level.unlocked}
              onClick={() => level.unlocked && setActiveLevel(level.id)}
              style={{ position: 'relative', textAlign: 'left' }}
            >
              <span className="me-2 fs-5">{level.emoji}</span>
              <div>
                <div className="fw-bold">Level {level.id}</div>
                <small>{level.name}</small>
              </div>
              {!level.unlocked && (
                <span className="position-absolute top-50 end-0 translate-middle-y me-3">🔒</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Section */}
      <div className="p-3 mt-2">
        <h6 className="text-white mb-2">Overall Progress</h6>
        <div className="progress" style={{ height: '25px', backgroundColor: '#343a40' }}>
          <div
            className="progress-bar bg-warning text-dark fw-bold"
            role="progressbar"
            style={{ width: '15%' }}
            aria-valuenow="15"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            15%
          </div>
        </div>
      </div>
    </div>
  );
};

// Level 1 Component - Story Adventure
const Level1 = () => {
  const [storyStep, setStoryStep] = useState(0);
  const [userChoices, setUserChoices] = useState([]);
  const [learningPoints, setLearningPoints] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [shake, setShake] = useState(false);

  // Characters with color themes from new code
  const characters = {
    maya: { name: "Maya", color: "#FF6B6B", emoji: "👩‍🦱", description: "A friendly guide" },
    leo: { name: "Leo", color: "#4ECDC4", emoji: "🧙‍♂️", description: "A wise wizard" },
    sam: { name: "Sam", color: "#FFD166", emoji: "🐉", description: "A small dragon" }
  };

  // Story content with black backgrounds instead of gradients
  const storyContent = [
    {
      type: "intro",
      background: "black",
      content: "Welcome to the Enchanted Forest! In this adventure, you'll learn English while exploring a magical world.",
      actions: [
        { text: "Begin Adventure", nextStep: 1 }
      ]
    },
    {
      type: "dialog",
      speaker: characters.maya,
      background: "black",
      content: "Hello! My name is Maya. Welcome to the Enchanted Forest! What's your name?",
      actions: [
        { text: "Nice to meet you, Maya! My name is...", nextStep: 2, points: 5 }
      ]
    },
    {
      type: "dialog",
      speaker: characters.leo,
      background: "black",
      content: "Greetings, traveler! I am Leo, the forest wizard. How are you today?",
      actions: [
        { text: "I'm fine, thank you!", nextStep: 3, points: 5 },
        { text: "I'm great, and you?", nextStep: 3, points: 10 }
      ]
    },
    {
      type: "dialog",
      speaker: characters.sam,
      background: "black",
      content: "Rawr! I'm Sam the dragon. I'm hungry. Do you have any food?",
      actions: [
        { text: "No, I don't have any food.", nextStep: 4, points: 5 },
        { text: "Sorry, I don't have food. Are you very hungry?", nextStep: 4, points: 10 }
      ]
    },
    {
      type: "dialog",
      speaker: characters.maya,
      background: "black",
      content: "We need to find the magic crystal. It's in the cave behind the waterfall. Can you help us?",
      actions: [
        { text: "Yes, I can help you!", nextStep: 5, points: 5 },
        { text: "Of course! What should we do first?", nextStep: 5, points: 10 }
      ]
    },
    {
      type: "dialog",
      speaker: characters.leo,
      background: "black",
      content: "Excellent! Before we go, let me teach you a magic word. Repeat after me: 'Illuminare'!",
      actions: [
        { text: "Illuminare!", nextStep: 6, points: 10 }
      ]
    },
    {
      type: "conclusion",
      background: "black",
      content: "Congratulations! You've completed the first chapter of your adventure. You've learned greetings, introductions, expressing needs, and asking for help.",
      actions: [
        { text: "Continue to Level 2", nextStep: 0 },
        { text: "Restart Adventure", nextStep: 0, reset: true }
      ]
    }
  ];

  const currentStep = storyContent[storyStep];

  // Handle user choice
  const handleChoice = (action) => {
    if (action.points) {
      const correct = action.points > 5;
      setIsCorrect(correct);
      setFeedbackText(correct ?
        `Great job! +${action.points} learning points!` :
        "That works, but there's a better answer. +5 learning points.");
      setShowFeedback(true);

      setTimeout(() => {
        setShowFeedback(false);
        processAction(action);
      }, 2000);
    } else {
      processAction(action);
    }
  };

  const processAction = (action) => {
    if (action.points) {
      setLearningPoints(prev => prev + action.points);
    }

    if (action.reset) {
      setStoryStep(0);
      setUserChoices([]);
      setLearningPoints(0);
    } else {
      setStoryStep(action.nextStep);
      setUserChoices([...userChoices, action.text]);
    }
  };

  // Message styling based on the newer code's style
  const messageStyle = (speaker) => ({
    backgroundColor: `${characters[speaker].color}33`,
    borderLeft: `5px solid ${characters[speaker].color}`,
    borderRadius: "12px",
    padding: "15px",
    marginBottom: "20px",
    maxWidth: "80%",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "transform 0.3s ease-in-out",
  });

  // Renders stars in the background like in the newer code
  const renderStarBackground = () => {
    return (
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: 0 }}>
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="position-absolute rounded-circle bg-white"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 5 + 2}s infinite`
            }}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className="container py-4 position-relative" style={{ minHeight: "90vh" }}>
      {/* Add stars background */}
      {renderStarBackground()}

      {/* Add animation styles */}
      <style>
        {`
          @keyframes twinkle {
            0% { opacity: 0.2; }
            50% { opacity: 1; }
            100% { opacity: 0.2; }
          }
          .choice-btn:hover {
            background-color: gray;
            border-color: gray;
            transform: translateY(-3px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.3);
          }
          .shake {
            animation: shake 0.5s;
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
        `}
      </style>

      <div
        className="card text-white  shadow-lg"
        style={{
          background: "black",
          minHeight: '500px',
          position: "relative",
          zIndex: "1",
          margin: "8%"
        }}
      >
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2>Level 1: Beginner&#39;s Journey</h2>
        </div>

        <div className="card-body p-4">
          {currentStep.type === "dialog" && (
            <div
              className="p-3 mb-4 rounded-3"
              style={messageStyle(currentStep.speaker.name.toLowerCase())}
            >
              <div className="d-flex align-items-center mb-2">
                <span className="fs-1 me-2">{currentStep.speaker.emoji}</span>
                <h3 style={{ color: currentStep.speaker.color }}>{currentStep.speaker.name}</h3>
              </div>
              <p className="fs-4">{currentStep.content}</p>
            </div>
          )}

          {(currentStep.type === "intro" || currentStep.type === "conclusion") && (
            <div className="text-center my-4">
              <h3 className="mb-3">{currentStep.content}</h3>
            </div>
          )}

          {currentStep.lesson && (
            <div className="alert alert-info mt-3">
              <strong>Learning Point:</strong> {currentStep.lesson}
            </div>
          )}

          <div className={`d-flex flex-column gap-3 mt-4 ${shake ? 'shake' : ''}`}>
            {currentStep.actions.map((action, index) => (
              <button
                key={index}
                className="choice-btn btn btn-outline-light text-start p-3 transition-all"
                onClick={() => handleChoice(action)}
                disabled={showFeedback}
              >
                {action.text}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className={`mt-3 alert ${isCorrect ? 'alert-success' : 'alert-warning'}`}>
              {feedbackText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Level 2 Component
const Level2 = () => {
  return (
    <div className="container py-4">
      <div
        className="card text-white border-light"
        style={{
          background: "black",
          minHeight: '500px'
        }}
      >
        <div className="card-header">
          <h2>Level 2: Grammar Explorer</h2>
        </div>
        <div className="card-body">
          <div className="alert alert-warning">
            <h4>This level is currently locked!</h4>
            <p>Complete Level 1 to unlock this adventure.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const StoryLine = () => {
  const [activeLevel, setActiveLevel] = useState(1);

  const levels = [
    { id: 1, name: "Beginner's Journey", emoji: "📚", unlocked: true },
    { id: 2, name: "Grammar Explorer", emoji: "🎓", unlocked: false },
    { id: 3, name: "Vocabulary Quest", emoji: "⭐", unlocked: false },
    { id: 4, name: "Conversation Master", emoji: "🎯", unlocked: false },
    { id: 5, name: "Cultural Expedition", emoji: "🌍", unlocked: false },
    { id: 6, name: "Fluency Summit", emoji: "🏆", unlocked: false }
  ];

  // Render appropriate level content
  const renderLevelContent = () => {
    switch(activeLevel) {
      case 1:
        return <Level1 />;
      case 2:
        return <Level2 />;
      default:
        return <div className="container py-4 text-white"><h2>Select a level to begin</h2></div>;
    }
  };

  return (
    <div className="d-flex bg-dark" style={{ minHeight: '100vh' }}>
      <Sidebar
        activeLevel={activeLevel}
        setActiveLevel={setActiveLevel}
        levels={levels}
      />
      <div className="flex-grow-1 bg-black">
        {renderLevelContent()}
      </div>
    </div>
  );
};

export default StoryLine;
