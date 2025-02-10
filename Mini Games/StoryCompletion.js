import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const StoryCompletion = () => {
  const storySteps = [
    {
      text: "Alex, an aspiring young explorer, found an old, mysterious map in his grandfather’s attic. It hinted at a hidden treasure deep within the Enchanted Forest. Eager to embark on an adventure, he first needed to...",
      options: ["Pack his backpack.", "Take a nap.", "Call his friend."],
      correct: "Pack his backpack."
    },
    {
      text: "With his bag packed and excitement in his heart, Alex entered the forest. The trees whispered secrets as he followed the trail. Suddenly, he came across a fork in the path. Should he...",
      options: ["Take the left path, where birds are chirping.", "Take the right path, leading into darkness.", "Turn back home."],
      correct: "Take the left path, where birds are chirping."
    },
    {
      text: "Following the path, Alex stumbled upon a rushing river. There was no bridge in sight, but he noticed stepping stones leading across. He decided to...",
      options: ["Carefully step on the stones.", "Jump into the water and swim.", "Wait for someone to help."],
      correct: "Carefully step on the stones."
    },
    {
      text: "Across the river, he encountered an old man sitting beside a campfire. The man offered Alex a riddle: 'The more you take, the more you leave behind. What am I?' Alex thought carefully and answered...",
      options: ["Footsteps.", "Time.", "Gold."],
      correct: "Footsteps."
    },
    {
      text: "Impressed by Alex’s wit, the old man gave him a golden key and whispered, 'It unlocks the hidden chamber beneath the ancient oak tree.' Alex searched for the tree and found it standing tall. He then...",
      options: ["Dug under the tree.", "Used the key on a hidden lock.", "Climbed the tree."],
      correct: "Used the key on a hidden lock."
    },
    {
      text: "With a soft click, a hidden door in the tree trunk creaked open, revealing a staircase leading underground. Alex bravely stepped inside and discovered...",
      options: ["A chest filled with gold.", "A sleeping dragon.", "A mysterious book."],
      correct: "A chest filled with gold."
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === storySteps[currentStep].correct) {
      setFeedback("✅ Correct!");
      setTimeout(() => {
        if (currentStep < storySteps.length - 1) {
          setCurrentStep(currentStep + 1);
          setSelectedOption(null);
          setFeedback("");
          setProgress(((currentStep + 1) / storySteps.length) * 100);
        } else {
          setCompleted(true);
          setProgress(100);
        }
      }, 1000);
    } else {
      setFeedback("❌ Oops! Try again.");
      setWrongAnswer(option);
      setTimeout(() => setWrongAnswer(null), 1000);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center text-white" style={{ backgroundColor: "#121212" }}>
      <div className="w-75 p-4 text-center">
        {!completed ? (
          <>
            <h2 className="mb-4">Complete the Adventure</h2>
            <p className="fs-4">{storySteps[currentStep].text}</p>
            <div className="d-flex flex-column gap-3 mt-3">
              {storySteps[currentStep].options.map((option, index) => (
                <button
                  key={index}
                  className={`btn btn-lg w-100 text-white btn-outline-light`}
                  onClick={() => handleOptionClick(option)}
                  style={{ transition: "background-color 0.3s", backgroundColor: option === wrongAnswer ? "#dc3545" : "" }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#333"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ""}
                >
                  {option}
                </button>
              ))}
            </div>
            {feedback && <p className="mt-4 fw-bold fs-5">{feedback}</p>}
            <div className="progress mt-4 bg-dark">
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${progress}%` }}
              >
                {Math.round(progress)}%
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-success fw-bold fs-2">
            <h2>🎉 Congratulations! You have completed Alex's adventure! 🎉</h2>
            <p className="mt-3 text-warning fs-4"><i className="bi bi-coin"></i> You earned 70 coins!</p>
            <p className="fs-4"><i className="bi bi-gift"></i> You earned game rewards!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryCompletion;
