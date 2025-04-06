"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface MidSectionProps {
  showAboutContent: boolean;
  isPlayMode: boolean;
  onGetStarted: () => void;
}

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: "Provide clear, friendly feedback for incorrect answers in a story-based learning format. Explain why the answer is wrong and give the correct answer with a brief explanation. Use simple language and keep it under 3 sentences."
});

export default function MidSection({ showAboutContent, isPlayMode, onGetStarted }: MidSectionProps) {
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [draggedOption, setDraggedOption] = useState<string | null>(null);

  const questions = [
    
    {
      question: "Choose the correct pronoun: 'My friend and (I/me) went to the movies.'",
      answer: "I",
      options: ["I", "me"],
      type: "dropdown"
    },
    {
      question: "________ I studied hard, I didn't pass the exam.",
      answer: "Although",
      options: ["Although", "Because", "Therefore", "If"],
      type: "drag-and-drop"
    },
    {
      question: "The dog chased ________ tail.",
      answer: "its",
      options: ["its", "it's", "their", "there"],
      type: "drag-and-drop"
    },
    {
      question: "She is ________ than her sister.",
      answer: "taller",
      options: ["more tall", "taller", "most tall", "tallest"],
      type: "drag-and-drop"
    },
    {
      question: "They ________ to the park yesterday.",
      answer: "went",
      options: ["go", "went", "gone", "going"],
      type: "drag-and-drop"
    },
    {
      question: "What is the highest mountain in the world?",
      answer: "Mount Everest",
      options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
      type: "button"
    },
    {
      question: "What is the capital city of Australia?",
      answer: "Canberra",
      options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      type: "button"
    },
    {
      question: "What is the name of the longest river in the world?",
      answer: "The Nile River",
      options: ["Amazon River", "Yangtze River", "The Nile River", "Mississippi River"],
      type: "button"
    },
  ];

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, option: string) => {
    e.dataTransfer.setData("text/plain", option);
    setDraggedOption(option);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedOption = e.dataTransfer.getData("text/plain");
    setSelectedAnswer(droppedOption);
    setDraggedOption(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const getGeminiFeedback = async (question: string, userAnswer: string) => {
    try {
      setIsLoading(true);
      const prompt = `Provide feedback for this answer in a story-based learning context:
        Question: ${question}
        User Answer: ${userAnswer}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Feedback Error:", error);
      return "Oops! We couldn't get feedback right now. Please try again.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = async () => {
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      setFeedback("");
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer("");
      } else {
        setShowQuestions(false);
        setCurrentQuestionIndex(0);
      }
    } else {
      const feedbackText = await getGeminiFeedback(
        questions[currentQuestionIndex].question,
        selectedAnswer
      );
      setFeedback(feedbackText);
    }
  };

  const handleTask1Click = () => {
    setShowQuestions(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setFeedback("");
  };

  if (showAboutContent) {
    return (
      <div className="w-full p-8 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">About Us</h1>
        <div className="w-16 h-1 bg-orange-500 mb-6"></div>
        <div className="max-w-4xl text-2xl text-center text-gray-700 space-y-4">
          <p>
            We believe learning should be an adventure. Our platform combines storytelling,
            games, and education to make learning engaging and fun for all ages.
          </p>
          <p>
            By combining storytelling, gamification, and advanced technology,
            we make learning exciting and effective through immersive story-driven challenges.
          </p>
        </div>
      </div>
    );
  }

  if (isPlayMode) {
    if (showQuestions) {
      const currentQuestion = questions[currentQuestionIndex];
      
      return (
        <div className="flex flex-col w-full h-[80vh] overflow-y-auto mt-4 md:mt-12 p-6">
          <div className="max-w-3xl mx-auto w-full">
            <div className="mb-6 text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {currentQuestion.question}
              </h2>
              
              {currentQuestion.type === "button" ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAnswer(option)}
                      className={`p-4 rounded-lg text-left transition-all ${
                        selectedAnswer === option
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : currentQuestion.type === "dropdown" ? (
                <select
                  value={selectedAnswer}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an answer</option>
                  {currentQuestion.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="space-y-4">
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center"
                  >
                    {selectedAnswer ? (
                      <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg inline-block">
                        {selectedAnswer}
                      </div>
                    ) : (
                      <p className="text-gray-500">Drag and drop your answer here</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, option)}
                        className={`p-4 rounded-lg cursor-pointer ${
                          draggedOption === option
                            ? "bg-blue-200"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {feedback && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="prose" dangerouslySetInnerHTML={{ __html: feedback }} />
                  <button 
                    onClick={() => setFeedback("")}
                    className="mt-2 text-sm text-yellow-700 hover:text-yellow-900"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {isLoading && (
                <div className="mt-4 text-gray-600 animate-pulse">
                  Analyzing your answer...
                </div>
              )}
            </div>

            <button
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswer || isLoading}
              className="w-full md:w-auto px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {currentQuestionIndex === questions.length - 1 ? "Complete Quest" : "Continue"}
            </button>

            <button
              onClick={() => setShowQuestions(false)}
              className="mt-4 text-gray-600 hover:text-gray-800 underline transition-colors"
            >
              Return to Story
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col w-full h-[80vh] overflow-y-auto mt-4 md:mt-12">
        <div className="w-full text-center mb-6 md:mb-10">
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-700 font-serif italic">
            Welcome to the Adventures of Elaria
          </h1>
        </div>

        {/* Section 1 */}
        <div className="w-full bg-orange-400 text-white p-3 md:p-4 flex justify-between items-center rounded-lg mb-4 md:mb-8">
          <div>
            <p className="text-xs md:text-sm font-semibold">SECTION 1, UNIT 1</p>
            <h1 className="text-lg md:text-xl font-bold">The Whispering Woods</h1>
          </div>
          <button className="bg-white text-green-600 font-medium px-3 py-1 md:px-4 md:py-2 rounded-lg shadow">
            GUIDEBOOK
          </button>
        </div>

        <div className="flex flex-col items-center mb-4 md:mb-8">
          <button className="bg-green-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg text-md md:text-lg mb-2 md:mb-4">
            START
          </button>

          <div className="flex flex-col items-center space-y-1 md:space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <button
                key={i}
                onClick={i === 0 ? handleTask1Click : undefined}
                className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg shadow w-32 md:w-40 transition hover:bg-blue-600"
              >
                Task {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Section 2 */}
        <div className="relative flex items-center justify-center w-full mb-4 md:mb-8">
            <div className="w-full border-t border-gray-300"></div>
            <div className="absolute bg-white px-2 text-gray-600">The Tower of Time</div>
          </div>
  
          {/* Section 2, Unit 2 */}
          <div className="w-full bg-orange-500 text-white p-3 md:p-4 flex justify-between items-center rounded-lg mb-4 md:mb-8">
            <div>
              <p className="text-xs md:text-sm font-semibold">SECTION 2, UNIT 2</p>
              <h1 className="text-lg md:text-xl font-bold"> The Tower of Time</h1>
            </div>
            <button className="bg-white text-green-600 font-medium px-3 py-1 md:px-4 md:py-2 rounded-lg shadow">
              GUIDEBOOK
            </button>
          </div>
          
          {/* Start Button for Section 2 */}
          <div className="flex flex-col items-center mb-4 md:mb-8">
            <button className="bg-green-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg text-md md:text-lg mb-2 md:mb-4">
              START
            </button>
  
            {/* Quiz Buttons for Section 2 */}
            <div className="flex flex-col items-center space-y-1 md:space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <button key={i} className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg shadow w-32 md:w-40">
                  Task {i + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="relative flex items-center justify-center w-full mb-4 md:mb-8">
            <div className="w-full border-t border-gray-300"></div>
            <div className="absolute bg-white px-2 text-gray-600">Order food delivery</div>
          </div>
  
  
          {/* Section 1, Unit 1 */}
          <div className="w-full bg-orange-400 text-white p-3 md:p-4 flex justify-between items-center rounded-lg mb-4 md:mb-8">
            <div>
              <p className="text-xs md:text-sm font-semibold">SECTION 3, UNIT 3</p>
              <h1 className="text-lg md:text-xl font-bold"> The Maze of Misdirection</h1>
            </div>
            <button className="bg-white text-green-600 font-medium px-3 py-1 md:px-4 md:py-2 rounded-lg shadow">
              GUIDEBOOK
            </button>
          </div>
  
  
          {/* Start Button for Section 1 */}
          <div className="flex flex-col items-center mb-4 md:mb-8">
            <button className="bg-green-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg text-md md:text-lg mb-2 md:mb-4">
              START
            </button>
  
  
            {/* Quiz Buttons for Section 1 */}
            <div className="flex flex-col items-center space-y-1 md:space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <button key={i} className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg shadow w-32 md:w-40">
                  Task {i + 1}
                </button>
              ))}
            </div>
          </div>
  
          {/* Horizontal Line for Section 1 with Text */}
          <div className="relative flex items-center justify-center w-full mb-4 md:mb-8">
            <div className="w-full border-t border-gray-300"></div>
            <div className="absolute bg-white px-2 text-gray-600">The Tower of Time</div>
          </div>


          <div className="w-full bg-orange-400 text-white p-3 md:p-4 flex justify-between items-center rounded-lg mb-4 md:mb-8">
            <div>
              <p className="text-xs md:text-sm font-semibold">SECTION 4, UNIT 4</p>
              <h1 className="text-lg md:text-xl font-bold">  The Echoing Caverns </h1>
            </div>
            <button className="bg-white text-green-600 font-medium px-3 py-1 md:px-4 md:py-2 rounded-lg shadow">
              GUIDEBOOK
            </button>
          </div>
  
  
          {/* Start Button for Section 1 */}
          <div className="flex flex-col items-center mb-4 md:mb-8">
            <button className="bg-green-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg text-md md:text-lg mb-2 md:mb-4">
              START
            </button>
  
  
            {/* Quiz Buttons for Section 1 */}
            <div className="flex flex-col items-center space-y-1 md:space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <button key={i} className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg shadow w-32 md:w-40">
                  Task {i + 1}
                </button>
              ))}
            </div>
          </div>
  
          {/* Horizontal Line for Section 1 with Text */}
          <div className="relative flex items-center justify-center w-full mb-4 md:mb-8">
            <div className="w-full border-t border-gray-300"></div>
            <div className="absolute bg-white px-2 text-gray-600">The Tower of Time</div>
          </div>



          <div className="w-full bg-orange-400 text-white p-3 md:p-4 flex justify-between items-center rounded-lg mb-4 md:mb-8">
            <div>
              <p className="text-xs md:text-sm font-semibold">SECTION 5, UNIT 5</p>
              <h1 className="text-lg md:text-xl font-bold"> The Market of Mischief</h1>
            </div>
            <button className="bg-white text-green-600 font-medium px-3 py-1 md:px-4 md:py-2 rounded-lg shadow">
              GUIDEBOOK
            </button>
          </div>
  
  
          {/* Start Button for Section 1 */}
          <div className="flex flex-col items-center mb-4 md:mb-8">
            <button className="bg-green-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg text-md md:text-lg mb-2 md:mb-4">
              START
            </button>
  
  
            {/* Quiz Buttons for Section 1 */}
            <div className="flex flex-col items-center space-y-1 md:space-y-2">
              {Array.from({ length: 5}).map((_, i) => (
                <button key={i} className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg shadow w-32 md:w-40">
                  Task {i + 1}
                </button>
              ))}
            </div>
          </div>
  
          {/* Horizontal Line for Section 1 with Text */}
          <div className="relative flex items-center justify-center w-full mb-4 md:mb-8">
            <div className="w-full border-t border-gray-300"></div>
            <div className="absolute bg-white px-2 text-gray-600">The Tower of Time</div>
          </div>
        </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-full -mt-16">
      <h1 className="text-4xl md:text-8xl font-bold text-gray-900 mb-4 text-center font-serif italic bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
        Embark on Your
      </h1>
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 text-center font-serif italic bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
        Learning Adventure
      </h1>
      <p className="text-gray-700 text-lg md:text-xl text-center max-w-2xl leading-relaxed bg-white backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-200 shadow-sm">
        Experience story-driven challenges that make learning exciting, fun, and memorable.
      </p>
      <button
        onClick={onGetStarted}
        className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
      >
        Get Started
      </button>
    </div>
  );
}