import { useState } from "react";
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
      if (currentIndex < words.length - 1) {
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
          setShuffled(shuffleWord(words[currentIndex + 1]));
          setInputValue("");
          setProgress(((currentIndex + 1) / words.length) * 100);
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

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center text-white" style={{ backgroundColor: "#121212" }}>
      <div className="w-75 p-4 text-center">
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
            <button className="btn btn-success mt-3" onClick={checkAnswer} disabled={!inputValue}>
              Submit
            </button>
            <div className="progress mt-4 bg-dark">
              <div className="progress-bar bg-success" role="progressbar" style={{ width: `${progress}%` }}>
                {Math.round(progress)}%
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-success fw-bold fs-2">
            <h2>🎉 Congratulations! You have completed the game! 🎉</h2>
            <p className="mt-3 text-warning fs-4"><i className="bi bi-coin"></i> You earned 60 coins!</p>
            <p className="fs-4"><i className="bi bi-award"></i> You earned a game reward!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MysteryWordGame;
