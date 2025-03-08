import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Game Constants
const levels = [
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
  },
];

// Characters
const characters = {
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
};

// Game content for Level 1
const level1Content = [
  {
    speaker: "captain",
    text: "Welcome to the StarQuest! I'm Captain Nova. What's your name?",
    choices: null,
    needsContinue: true
  },
  {
    speaker: "alien",
    text: "Hello! I'm leevi from Planet Lexicon. We speak many languages here!",
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
    text: "Let's start practicing from the basics! How would you respond when someone says 'Hello, how are you?'",
    choices: [
      { id: 1, text: "I'm fine, thank you. what about you?", correct: true },
      { id: 2, text: "Yes fine, hello for you.", correct: false },
      { id: 3, text: "I am a human .", correct: false }
    ],
    needsContinue: false,
  },
  {
    speaker: "alien",
    text: "On my planet, we introduce ourselves with our name and something we like. wanna try it!",
    choices: [
      { id: 1, text: " My name is [name] and I like space exploration.", correct: true },
      { id: 2, text: "I am called [name].", correct: false },
      { id: 3, text: "[name]. Remember it.", correct: false }
    ],
    needsContinue: false,
  },
  {
    speaker: "captain",
    text: "Great! Now let's learn how to say goodbye. Which is the best way to end a conversation?",
    choices: [
      { id: 1, text: "End transmission.", correct: false },
      { id: 2, text: "Goodbye, it was nice talking to you!", correct: true },
      { id: 3, text: "I go now.", correct: false }
    ],
    needsContinue: false,
  }
];

export default function StoryLine() {
  const [userLevels, setUserLevels] = useState(levels);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [nameEntered, setNameEntered] = useState(false);
  const [gameStep, setGameStep] = useState(0);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [levelComplete, setLevelComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [shake, setShake] = useState(false);
  const [characterAnimation, setCharacterAnimation] = useState("");

  // Handle level selection
  const handleLevelClick = (level) => {
    if (level.unlocked) {
      setCurrentLevel(level);
      setGameStep(0);
      setLevelComplete(false);
      setScore(0);
    }
  };

  // Handle player name submission
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      setNameEntered(true);
      triggerCharacterAnimation();
    }
  };

  // Handle continue button for dialogue without choices
  const handleContinue = () => {
    if (gameStep < level1Content.length - 1) {
      setFadeOut(true);
      setTimeout(() => {
        setGameStep(gameStep + 1);
        setFadeOut(false);
        triggerCharacterAnimation();
      }, 500);
    }
  };

  // Handle player choice selection
  const handleChoiceSelect = (choice) => {
    const currentContent = level1Content[gameStep];

    if (currentContent.choices) {
      const selectedChoice = currentContent.choices.find(c => c.id === choice.id);

      if (selectedChoice.correct) {
        setIsCorrect(true);

        // Add score and coins
        const pointsEarned = 10;
        const coinsEarned = 25;
        setScore(score + pointsEarned);
        setCoins(coins + coinsEarned);

        setFeedbackText(`Excellent! That's correct! +${pointsEarned} points, +${coinsEarned} coins`);

        // If this is the last question, check if we should unlock next level
        if (gameStep === level1Content.length - 1) {
          const updatedLevels = [...userLevels];
          if (currentLevel.id < 5) {
            updatedLevels[currentLevel.id].unlocked = true;
          }
          setUserLevels(updatedLevels);

          // Add final completion bonus
          const levelBonus = 50;
          const coinBonus = 100;
          setScore(prevScore => prevScore + levelBonus);
          setCoins(prevCoins => prevCoins + coinBonus);

          setTimeout(() => {
            setLevelComplete(true);
          }, 2500);
        }
      } else {
        setIsCorrect(false);
        setFeedbackText("Not quite right. Try again!");
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }

      setShowFeedback(true);

      // Auto-advance after feedback if correct
      if (selectedChoice.correct) {
        setTimeout(() => {
          setShowFeedback(false);
          if (gameStep < level1Content.length - 1) {
            setFadeOut(true);
            setTimeout(() => {
              setGameStep(gameStep + 1);
              setFadeOut(false);
              triggerCharacterAnimation();
            }, 500);
          }
        }, 2000);
      } else {
        setTimeout(() => {
          setShowFeedback(false);
        }, 2000);
      }
    }
  };

  // Restart level
  const handleRestartLevel = () => {
    setGameStep(0);
    setScore(0);
    setLevelComplete(false);
    triggerCharacterAnimation();
  };

  // Proceed to next level
  const handleNextLevel = () => {
    const nextLevelId = currentLevel.id + 1;
    const nextLevel = userLevels.find(level => level.id === nextLevelId);
    if (nextLevel && nextLevel.unlocked) {
      setCurrentLevel(nextLevel);
      setGameStep(0);
      setLevelComplete(false);
      triggerCharacterAnimation();
    }
  };

  // Trigger character animation
  const triggerCharacterAnimation = () => {
    setCharacterAnimation("animate");
    setTimeout(() => setCharacterAnimation(""), 1000);
  };

  // Replace [name] placeholder with player's name
  const replaceNamePlaceholder = (text) => {
    return text.replace("[name]", playerName);
  };

  // Get current content based on game step
  const getCurrentContent = () => {
    if (gameStep < level1Content.length) {
      return level1Content[gameStep];
    }
    return null;
  };

  const currentContent = getCurrentContent();

  // Styling
  const messageStyle = (speaker) => ({
    backgroundColor: characters[speaker].color,
    borderRadius: "20px",
    padding: "15px",
    marginBottom: "20px",
    maxWidth: "80%",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transform: characterAnimation === "animate" ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
    opacity: fadeOut ? 0 : 1,
  });

  return (
      <div className="vh-100 d-flex flex-column bg-dark text-white overflow-hidden">
        <div className="d-flex flex-grow-1 overflow-hidden">
          {/* Sidebar */}
          <div
              className="d-flex flex-column p-3 bg-black bg-opacity-75 overflow-auto"
              style={{
                width: "280px",
                backdropFilter: "blur(10px)",
                borderRight: "2px solid rgba(255,255,255,0.1)"
              }}
          >
            <div className="text-center mb-4">
              <h1 className="display-6 fw-bold text-primary mb-2">
                Story Smart
              </h1>
              <p className="text-muted small">Space English Learning Adventure</p>
            </div>

            {/* Level Selection */}
            <div className="levels-container flex-grow-1 overflow-auto pe-2">
              {userLevels.map((level) => (
                  <button
                      key={level.id}
                      className={`btn mb-3 w-100 d-flex align-items-center level-name ${
                          level.unlocked
                              ? "btn-outline-light text-light"
                              : "btn-secondary text-muted"
                      } ${currentLevel?.id === level.id ? "border-3 border-light" : ""}`}
                      onClick={() => handleLevelClick(level)}
                      disabled={!level.unlocked}
                  >
                    {level.unlocked ? (
                        <span className="me-3">🚀</span>
                    ) : (
                        <span className="me-3">🔒</span>
                    )}
                    <div className="text-start flex-grow-1">
                      <div className="fw-bold level-name">{level.name}</div>
                      <small className="text-light d-block level-name">{level.title}</small>
                    </div>
                  </button>
              ))}
            </div>

            {/* Player Stats */}
            {currentLevel && nameEntered && (
                <div className="mt-4 p-3 bg-dark rounded shadow">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>Player:</span>
                    <span className="fw-bold">{playerName}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Score:</span>
                    <span className="fw-bold">{score}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Coins:</span>
                    <span className="fw-bold text-warning">
                  <span className="me-1">💰</span>
                      {coins}
                </span>
                  </div>
                  <div className="progress mt-2">
                    <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${(gameStep / level1Content.length) * 100}%` }}
                        aria-valuenow={(gameStep / level1Content.length) * 100}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    ></div>
                  </div>
                </div>
            )}

          </div>

          {/* Main Game Area */}
          <div className="flex-grow-1 d-flex flex-column position-relative overflow-hidden p-4 m-4">
            {/* Stars background effect */}
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

            {/* Main Content Area */}
            <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center position-relative" style={{ zIndex: 1 }}>
              {/* Initial Screen - No Level Selected */}
              {!currentLevel ? (
                  <div className="text-center">
                    <h1 className="display-4 mb-4">Space English Adventure</h1>
                    <p className="lead mb-4">Learn English while exploring the galaxy!</p>
                    <p className="mb-5">Select Level 1 to begin your journey.</p>
                    <div className="d-flex justify-content-center gap-5">
                      {Object.values(characters).map((char) => (
                          <div key={char.name} className="text-center animate">
                            <div className="display-1 mb-2">{char.avatar}</div>
                            <p style={{color: char.color}}>{char.name}</p>
                          </div>
                      ))}
                    </div>
                  </div>
              ) : (
                  <>
                    {/* Name Entry Screen */}
                    {!nameEntered ? (
                        <div className="bg-dark bg-opacity-75 p-5 rounded shadow-lg text-center">
                          <h2 className="mb-4">{currentLevel.title}</h2>
                          <p className="mb-4">{currentLevel.description}</p>
                          <div className="mb-4">
                            <div className="display-1 mb-3">👩‍🚀</div>
                            <p className="lead">Captain Nova needs to know your name before we begin our mission!</p>
                          </div>
                          <form onSubmit={handleNameSubmit} className="d-flex flex-column align-items-center">
                            <input
                                type="text"
                                className="form-control mb-3 w-75"
                                placeholder="Enter your name"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn btn-primary px-4">
                              Start Mission
                            </button>
                          </form>
                        </div>
                    ) : levelComplete ? (
                        <div className="bg-dark bg-opacity-75 p-5 rounded shadow-lg text-center">
                          <div className="display-1 mb-3">🎉</div>
                          <h2 className="mb-3">Level Complete!</h2>
                          <div className="alert alert-success">
                            <p className="fs-4 mb-2">+50 bonus points!</p>
                            <p className="fs-4">+100 bonus coins!</p>
                          </div>
                          <p className="lead mb-4">Congratulations! You&#39;ve completed {currentLevel.title}.</p>

                          <div className="d-flex justify-content-between mb-4 p-3 bg-dark rounded">
                            <div className="text-center px-4">
                              <h5>Final Score</h5>
                              <p className="fs-3 fw-bold">{score}</p>
                            </div>
                            <div className="text-center px-4">
                              <h5>Coins Earned</h5>
                              <p className="fs-3 fw-bold text-warning">
                                <span className="me-2">💰</span>
                                {coins}
                              </p>
                            </div>
                          </div>

                          <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-secondary" onClick={handleRestartLevel}>
                              Replay Level
                            </button>
                            {currentLevel.id < 5 && userLevels[currentLevel.id].unlocked && (
                                <button className="btn btn-primary" onClick={handleNextLevel}>
                                  Next Level →
                                </button>
                            )}
                          </div>
                        </div>
                    ) : currentContent ? (
                        <div className="w-100 d-flex flex-column game-content">
                          <div className={`d-flex ${currentContent.speaker === 'captain' || currentContent.speaker === 'robot' ? 'justify-content-start' : 'justify-content-end'}`}>
                            <div className="d-flex gap-3 align-items-start" style={messageStyle(currentContent.speaker)}>
                              <div className="fs-1 mt-2 animate">
                                {characters[currentContent.speaker].avatar}
                              </div>
                              <div>
                                <div className="fw-bold mb-2" style={{ color: "#000" }}>
                                  {characters[currentContent.speaker].name}
                                </div>
                                <div style={{ fontSize: "1.1rem" }}>
                                  {currentContent.choices
                                      ? replaceNamePlaceholder(currentContent.text)
                                      : currentContent.text}
                                </div>
                              </div>
                            </div>
                          </div>

                          {currentContent.choices && (
                              <div className="mt-4">
                                <div className={`d-flex flex-column gap-3 ${shake ? 'shake' : ''}`}>
                                  {currentContent.choices.map(choice => (
                                      <button
                                          key={choice.id}
                                          className="choice-btn btn btn-outline-light text-start p-3 transition-all"
                                          onClick={() => handleChoiceSelect(choice)}
                                          disabled={showFeedback}
                                      >
                                        {replaceNamePlaceholder(choice.text)}
                                      </button>
                                  ))}
                                </div>
                              </div>
                          )}

                          {currentContent.needsContinue && (
                              <div className="mt-4 d-flex justify-content-center">
                                <button
                                    className="continue-btn btn btn-primary px-4 py-2"
                                    onClick={handleContinue}
                                >
                                  Continue →
                                </button>
                              </div>
                          )}

                          {showFeedback && (
                              <div className={`mt-3 alert ${isCorrect ? 'alert-success' : 'alert-danger'} animate`}>
                                {feedbackText}
                              </div>
                          )}
                        </div>
                    ) : null}
                  </>
              )}

            </div>
          </div>
        </div>

        {/* Animations and Styles */}
        <style>
          {`
          @keyframes twinkle {
            0% { opacity: 0.2; }
            50% { opacity: 1; }
            100% { opacity: 0.2; }
          }
          .choice-btn:hover {
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
          .animate {
            animation: pop 0.5s;
          }
          @keyframes pop {
            0% { transform: scale(0.8); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          .continue-btn {
            transition: all 0.3s;
          }
          .continue-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          }
          .continue-btn:active {
            transform: translateY(0);
          }
          .badge-popup {
            animation: badgePop 0.5s, badgeGlow 1.5s infinite alternate;
          }
          @keyframes badgePop {
            0% { transform: scale(0); }
            70% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          @keyframes badgeGlow {
            0% { box-shadow: 0 0 10px gold; }
            100% { box-shadow: 0 0 25px gold; }
          }
          .badge-icon {
            animation: pulse 1s infinite alternate;
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
          }
          .btn-outline-light:hover {
            background-color: darkgray
          }
        `}
        </style>
      </div>
  );
}