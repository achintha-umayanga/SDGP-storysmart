import { useState, useEffect } from "react";

const RolePlayGame = () => {
  // ... [Previous game logic and state remains the same] ...
  const conversationSteps = [
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
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [progress, setProgress] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameOver, setGameOver] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // ... [Previous game logic methods remain the same] ...
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameOver) {
      handleTimeout();
    }
  }, [timeLeft, gameOver]);

  const handleTimeout = () => {
    if (currentStep < conversationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setFeedback("");
      setProgress(((currentStep + 1) / conversationSteps.length) * 100);
      setTimeLeft(20);
    } else {
      setGameOver(true);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.text);
    if (option.correct) {
      setScore(score + option.points);
      setCorrectAnswers(correctAnswers + 1);
      setFeedback("✨ Wise choice, adventurer!");
      setTimeout(() => {
        if (currentStep < conversationSteps.length - 1) {
          setCurrentStep(currentStep + 1);
          setSelectedOption(null);
          setFeedback("");
          setProgress(((currentStep + 1) / conversationSteps.length) * 100);
          setTimeLeft(20);
        } else {
          setProgress(100);
          setGameOver(true);
        }
      }, 1000);
    } else {
      setFeedback("🔥 The path is treacherous, try again!");
      setWrongAnswer(option.text);
      setTimeout(() => setWrongAnswer(null), 1000);
    }
  };

  const percentageCorrect = Math.round((correctAnswers / conversationSteps.length) * 100);

  const styles = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }

    .option-btn {
      transition: all 0.2s ease;
      border: 2px solid #4a90e2;
      background: rgba(74, 144, 226, 0.15);
      color: #ffffff !important;
    }

    .option-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      background: rgba(74, 144, 226, 0.25) !important;
      box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
    }

    .option-btn.shake {
      animation: shake 0.5s ease-in-out;
      background: rgba(220, 53, 69, 0.25) !important;
      border-color: #dc3545;
    }

    .game-container {
      background: #2C2C2C;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    }

    .speaker-text {
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }

    .badge {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  `;

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5"
         style={{ backgroundColor: "#1a2238" }}>
      <style>{styles}</style>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8" >
            <div className="game-container rounded-4 p-4 p-md-5" style={{background: '#2a3b63'}}>
              {!gameOver ? (
                <div className="text-center">
                  <div className="d-flex justify-content-between mb-4">
                    <div className="badge p-3 fs-6" style={{ background: '#3498db' }}>
                      ⏱️ Time: {timeLeft}s
                    </div>
                    <div className="badge p-3 fs-6" style={{ background: '#2ecc71' }}>
                      💫 Score: {score}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 style={{ color: '#4a90e2' }} className="mb-2">
                      {conversationSteps[currentStep].speaker}
                    </h3>
                    <p className="speaker-text fs-5 mb-4">
                      32+
                      &#34;{conversationSteps[currentStep].text}&#34;
                    </p>
                  </div>

                  <div className="d-flex flex-column gap-3">
                    {conversationSteps[currentStep].options.map((option, index) => (
                      <button
                        key={index}
                        className={`option-btn btn btn-lg ${
                          option.text === wrongAnswer ? 'shake' : ''
                        }`}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>

                  {feedback && (
                    <p className="mt-4 fw-bold fs-5 text-white">{feedback}</p>
                  )}

                  <div className="progress mt-4" style={{ height: "8px", backgroundColor: "#404040" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${progress}%`, background: '#45c106' }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center text-white">
                  <h2 className="mb-4">Quest Complete!</h2>

                  <div className="p-4 mb-4 rounded-4" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <p className="fs-4 mb-3">Final Score: {score}</p>
                    <p className="fs-4 mb-4">Wisdom Rating: {percentageCorrect}%</p>

                    <div className="progress mb-3" style={{ height: "12px", backgroundColor: "#404040" }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${percentageCorrect}%`, background: '#3498db' }}
                      />
                    </div>

                    <div className="mt-4">
                      {percentageCorrect === 100 && (
                        <p style={{ color: '#2ecc71' }} className="fs-5">🏆 True Wisdom Seeker!</p>
                      )}
                      {percentageCorrect >= 70 && percentageCorrect < 100 && (
                        <p style={{ color: '#3498db' }} className="fs-5">⭐ Promising Apprentice!</p>
                      )}
                      {percentageCorrect < 70 && (
                        <p style={{ color: '#f1c40f' }} className="fs-5">📚 The journey of learning continues...</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePlayGame;



