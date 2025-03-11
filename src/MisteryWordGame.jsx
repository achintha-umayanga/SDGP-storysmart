/*
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const words = ["MAGIC", "WORLD", "STORY", "BRIDGE", "RIDDLE"];

const shuffleWord = (word) => word.split("").sort(() => Math.random() - 0.5).join("");

const MysteryWordGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffled, setShuffled] = useState(shuffleWord(words[0]));
  const [inputValue, setInputValue] = useState("");
  const [progress, setProgress] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [invalidChar, setInvalidChar] = useState(false);
  const [lengthExceeded, setLengthExceeded] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // Timer
  const [hintUsed, setHintUsed] = useState(false); // Hint
  const [score, setScore] = useState(0); // Start with 0 score
  const [correctAnswers, setCorrectAnswers] = useState(0); // Track correct answers

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameOver) {
      handleTimeout(); // Move to the next question when time runs out
    }
  }, [timeLeft, gameOver]);

  const handleInputChange = (event) => {
    const value = event.target.value.toUpperCase();

    if (value.length > shuffled.length) {
      setLengthExceeded(true);
      setTimeout(() => setLengthExceeded(false), 1000);
      return;
    }

    setInputValue(value);

    if (value && !shuffled.includes(value[value.length - 1])) {
      setInvalidChar(true);
      setTimeout(() => setInvalidChar(false), 500);
    }
  };

  const checkAnswer = () => {
    if (inputValue === words[currentIndex]) {
      setScore((prevScore) => prevScore + 20); // Add 20 points for correct answer
      setCorrectAnswers((prev) => prev + 1); // Increment correct answers
      if (currentIndex < words.length - 1) {
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
          setShuffled(shuffleWord(words[currentIndex + 1]));
          setInputValue("");
          setProgress(((currentIndex + 1) / words.length) * 100);
          setTimeLeft(30); // Reset timer for the next word
          setHintUsed(false); // Reset hint for the next word
        }, 500);
      } else {
        setProgress(100);
        setGameOver(true);
      }
    } else {
      setWrong(true);
      setTimeout(() => {
        setInputValue("");
        setWrong(false);
      }, 500);
    }
  };

  const handleTimeout = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShuffled(shuffleWord(words[currentIndex + 1]));
      setInputValue("");
      setProgress(((currentIndex + 1) / words.length) * 100);
      setTimeLeft(30); // Reset timer for the next word
      setHintUsed(false); // Reset hint for the next word
    } else {
      setProgress(100);
      setGameOver(true);
    }
  };

  const useHint = () => {
    if (!hintUsed) {
      setInputValue(words[currentIndex][0]); // Show the first letter as a hint
      setHintUsed(true);
    }
  };

  // Calculate percentage of correct answers
  const percentageCorrect = Math.round((correctAnswers / words.length) * 100);

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center text-white position-relative overflow-hidden">
      {/!* Background Video *!/}
      <video
        autoPlay
        loop
        muted
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        style={{ zIndex: -1 }}
      >
        <source src="/mysteryword.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/!* Game Content *!/}
      <div className="w-75 p-4 text-center bg-dark bg-opacity-75 rounded-4" style={{ zIndex: 1 }}>
        <h2 className="mb-4">Mystery Word Builder</h2>
        {!gameOver ? (
          <>
            <p className="fs-4 text-info">Rearrange the letters to form a correct word:</p>
            <h3 className="mb-3">{shuffled}</h3>
            <input
              type="text"
              className={`form-control text-center ${wrong || invalidChar || lengthExceeded ? "bg-danger text-white" : ""}`}
              value={inputValue}
              onChange={handleInputChange}
              maxLength={shuffled.length + 1}
            />
            {lengthExceeded && <p className="text-danger mt-2">Letter count exceeded</p>}
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button className="btn btn-success" onClick={checkAnswer} disabled={!inputValue}>
                Submit
              </button>
              <button className="btn btn-warning" onClick={useHint} disabled={hintUsed}>
                Use Hint
              </button>
            </div>
            <div className="progress mt-4 bg-dark">
              <div className="progress-bar bg-success" role="progressbar" style={{ width: `${progress}%` }}>
                {Math.round(progress)}%
              </div>
            </div>
            <p className="mt-3">Time Left: {timeLeft} seconds</p>
            <p className="mt-3">Current Score: {score}</p>
          </>
        ) : (
          <div className="text-center text-success fw-bold fs-2">
            <h2>🎉 Congratulations! You have completed the game! 🎉</h2>
            <p className="mt-3 text-warning fs-5"><i className="bi bi-coin"></i> You earned {score} coins!</p>
            {/!* Game Rewards Section *!/}
            <div className="p-4 rounded-3 text-light mt-6" style={{ backgroundColor: "#2a3b63" }}>
                <div className="p-3 rounded bg-dark bg-opacity-25">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-puzzle fs-4 text-success me-3"></i>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between mb-1">
                        <span>Mystery Word Builder</span>
                        <span className="text-success">{percentageCorrect}%</span>
                      </div>
                      <div className="progress" style={{ height: "4px" }}>
                        <div
                          className="progress-bar bg-success"
                          style={{ width: `${percentageCorrect}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MysteryWordGame;*/


import { useState, useEffect } from "react";

const words = ["MAGIC", "WORLD", "STORY", "BRIDGE", "RIDDLE"];

const shuffleWord = (word) => word.split("").sort(() => Math.random() - 0.5).join("");

const MysteryWordGame = () => {
  // ... [Previous state definitions remain the same] ...
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffled, setShuffled] = useState(shuffleWord(words[0]));
  const [inputValue, setInputValue] = useState("");
  const [progress, setProgress] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [invalidChar, setInvalidChar] = useState(false);
  const [lengthExceeded, setLengthExceeded] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [hintUsed, setHintUsed] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [shake, setShake] = useState(false);

  // ... [Previous game logic remains the same] ...
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameOver) {
      handleTimeout();
    }
  }, [timeLeft, gameOver]);

  const handleInputChange = (event) => {
    const value = event.target.value.toUpperCase();

    if (value.length > shuffled.length) {
      setLengthExceeded(true);
      setShake(true);
      setTimeout(() => {
        setLengthExceeded(false);
        setShake(false);
      }, 1000);
      return;
    }

    setInputValue(value);

    if (value && !shuffled.includes(value[value.length - 1])) {
      setInvalidChar(true);
      setShake(true);
      setTimeout(() => {
        setInvalidChar(false);
        setShake(false);
      }, 500);
    }
  };

  const checkAnswer = () => {
    if (inputValue === words[currentIndex]) {
      setScore((prevScore) => prevScore + 20);
      setCorrectAnswers((prev) => prev + 1);
      if (currentIndex < words.length - 1) {
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
          setShuffled(shuffleWord(words[currentIndex + 1]));
          setInputValue("");
          setProgress(((currentIndex + 1) / words.length) * 100);
          setTimeLeft(30);
          setHintUsed(false);
        }, 500);
      } else {
        setProgress(100);
        setGameOver(true);
      }
    } else {
      setWrong(true);
      setShake(true);
      setTimeout(() => {
        setInputValue("");
        setWrong(false);
        setShake(false);
      }, 500);
    }
  };

  const handleTimeout = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShuffled(shuffleWord(words[currentIndex + 1]));
      setInputValue("");
      setProgress(((currentIndex + 1) / words.length) * 100);
      setTimeLeft(30);
      setHintUsed(false);
    } else {
      setProgress(100);
      setGameOver(true);
    }
  };

  const useHint = () => {
    if (!hintUsed) {
      setInputValue(words[currentIndex][0]);
      setHintUsed(true);
    }
  };

  const percentageCorrect = Math.round((correctAnswers / words.length) * 100);

  const styles = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }

    .game-letter {
      background: #4a90e2;
      transition: transform 0.2s ease;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .game-letter:hover {
      transform: scale(1.05);
      background: #357abd;
    }

    .shake {
      animation: shake 0.5s ease-in-out;
    }

    .custom-input {
      background: rgba(255, 255, 255, 0.15);
      border: 2px solid #4a90e2;
      color: #ffffff !important;
      transition: all 0.2s ease;
    }

    .custom-input:focus {
      box-shadow: 0 0 10px rgba(74, 144, 226, 0.3);
      border-color: #4a90e2;
      background: rgba(255, 255, 255, 0.2);
    }

    .custom-input::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    .game-btn {
      transition: all 0.2s ease;
    }

    .game-btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .game-btn:disabled {
      opacity: 0.7;
    }

    .game-card {
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    }
  `;

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5 game-container"
         style={{ backgroundColor: "#1a2238" }}>
      <style>{styles}</style>

      <div className="container" >
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="game-card rounded-4 p-4 p-md-5" style={{background: '#2a3b63'}}>
              <h1 className="text-white text-center mb-5 fw-bold">Mystery Word Builder</h1>

              {!gameOver ? (
                <div className="text-center">
                  <div className="d-flex justify-content-between mb-4">
                    <div className="badge p-3 fs-6" style={{ background: '#3498db' }}>
                      Time: {timeLeft}s
                    </div>
                    <div className="badge p-3 fs-6" style={{ background: '#2ecc71' }}>
                      Score: {score}
                    </div>
                  </div>

                  <div className="d-flex justify-content-center gap-2 mb-4">
                    {shuffled.split("").map((letter, index) => (
                      <div
                        key={index}
                        className={`game-letter rounded-3 p-3 text-white fs-3 fw-bold ${shake ? 'shake' : ''}`}
                        style={{ width: "60px", height: "60px" }}
                      >
                        {letter}
                      </div>
                    ))}
                  </div>

                  <input
                    type="text"
                    className={`custom-input form-control form-control-lg text-center mb-4 ${wrong || invalidChar || lengthExceeded ? 'shake' : ''}`}
                    value={inputValue}
                    onChange={handleInputChange}
                    maxLength={shuffled.length + 1}
                    placeholder="Type your answer..."
                  />

                  <div className="d-flex justify-content-center gap-3 mb-4">
                    <button
                      className="game-btn btn btn-lg px-4 py-2 text-white"
                      onClick={checkAnswer}
                      disabled={!inputValue}
                      style={{ background: '#3498db' }}
                    >
                      Submit
                    </button>
                    <button
                      className="game-btn btn btn-lg px-4 py-2"
                      onClick={useHint}
                      disabled={hintUsed}
                      style={{ background: '#2ecc71' }}
                    >
                      Hint
                    </button>
                  </div>

                  <div className="progress" style={{ height: "8px", backgroundColor: "#404040" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${progress}%`, background: '#3498db' }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center text-white">
                  <h2 className="mb-4">Game Complete!</h2>

                  <div className="p-4 mb-4 rounded-4" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <p className="fs-4 mb-3">Final Score: {score}</p>
                    <p className="fs-4 mb-4">Accuracy: {percentageCorrect}%</p>

                    <div className="progress mb-3" style={{ height: "12px", backgroundColor: "#404040" }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${percentageCorrect}%`, background: '#3498db' }}
                      />
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

export default MysteryWordGame;