"use client"

import { useState, useRef, useEffect } from "react"
import { Home, Music2, Trophy, BookOpen, Award, User, MoreHorizontal } from "lucide-react"
import howToPlayImage from "@/Images/how-to-play.png" // Import the how-to-play image
import logoImage from "@/Images/logo.jpg" // Import the logo image from the Images folder

interface SidebarProps {
  setShowPlayContentAction: (value: boolean) => void
}

export function Sidebar({ setShowPlayContentAction }: SidebarProps) {
  const [showGuide, setShowGuide] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false) // New state for leaderboard
  const modalRef = useRef<HTMLDivElement>(null)

  // Guide Steps
  const guideSteps = [
    { step: 1, title: "Sign Up or Sign In", description: "Create an account to access all features." },
    { step: 2, title: "Choose Your Topic", description: "Select your topic like math puzzles, language learning, coding, and more." },
    { step: 3, title: "Choose Your Story", description: "Select a story from the library. Each story is a unique adventure designed to teach you while you explore exciting scenarios." },
    { step: 4, title: "Complete Challenges", description: "Solve puzzles, answer quizzes, or complete mini-games to move forward." },
    { step: 5, title: "Earn Rewards", description: "Gain points, badges, and rewards for completing tasks and challenges." },
    { step: 6, title: "Track Your Progress", description: "Use the Progress Dashboard to see your achievements and track learning goals." },
    { step: 7, title: "Have Fun and Learn", description: "Enjoy the journey! Each story is designed to make learning fun." },
  ]

  // Leaderboard Data
  const leaderboardData = [
    { rank: 1, name: "Player 1", score: 7, badges: 6, levels: 6 }, // Added levels
    { rank: 2, name: "Player 2", score: 6, badges: 7, levels: 4 }, // Added levels
    { rank: 3, name: "Player 3", score: 5, badges: 5, levels: 3 }, // Added level
    { rank: 4, name: "Player 4", score: 5, badges: 5, levels: 2 },
    { rank: 5, name: "Player 5", score: 5, badges: 4, levels: 1 },
  ]

  // Close the modal if the user clicks outside of the box
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowGuide(false)
        setShowLeaderboard(false)
      }
    }

    if (showGuide || showLeaderboard) {
      document.addEventListener("mousedown", handleOutsideClick)
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [showGuide, showLeaderboard])

  const navItems = [
    { label: "PLAY", icon: <Home className="h-6 w-6 text-blue-500" />, onClick: () => setShowPlayContentAction(true) },
    { label: "SOUNDS", icon: <Music2 className="h-6 w-6 text-purple-500" />, href: "/sounds" },
    { label: "LEADERBOARDS", icon: <Trophy className="h-6 w-6 text-yellow-500" />, onClick: () => setShowLeaderboard(true) }, // Updated to show leaderboard
    { label: "PLAYER-GUIDE", icon: <BookOpen className="h-6 w-6 text-green-500" />, onClick: () => setShowGuide(true) },
    { label: "ACHIEVEMENTS", icon: <Award className="h-6 w-6 text-pink-500" />, href: "/shop" },
    { label: "PROFILE", icon: <User className="h-6 w-6 text-indigo-500" />, href: "/profile" },
    { label: "MORE", icon: <MoreHorizontal className="h-6 w-6 text-gray-500" />, href: "/more" },
  ]

  return (
    <div className="flex h-screen w-[80px] md:w-[260px] flex-col items-center border-r bg-white p-2 md:p-4">
      {/* Logo and Text */}
      <div 
        className="mt-4 md:mt-6 mb-8 flex items-center gap-2 cursor-pointer" 
        onClick={() => window.location.reload()} // Add onClick handler to refresh the page
      >
        <img
          src={logoImage.src} // Use the imported logo image
          alt="StorySmart"
          className="h-8 md:h-10"
        />
        <span className="hidden md:inline text-2xl font-bold text-gray-900">STORYSMART</span> {/* Text next to the logo */}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2 md:space-y-4 w-full -ml-2 md:-ml-4">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className="flex items-center gap-2 md:gap-3 rounded-lg px-2 md:px-4 py-2 text-sm font-medium transition-colors text-gray-700 hover:bg-gray-100"
          >
            {item.icon}
            <span className="hidden md:inline">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Modal for Player Guide */}
      {showGuide && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={modalRef}
            className="bg-white p-8 rounded-xl w-[90%] md:w-[600px] max-h-[80vh] overflow-auto flex flex-col items-center text-center"
          >
            {/* Image at the top */}
            <img
              src={howToPlayImage.src}
              alt="How to Play"
              className="w-full max-w-[400px] mb-6 rounded-lg"
            />

            {/* Guide Steps */}
            <div className="space-y-6 w-full">
              {guideSteps.map((step) => (
                <div key={step.step} className="flex flex-col items-center">
                  <div className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                  <h3 className="mt-2 font-semibold">{step.title}</h3>
                  <p className="text-gray-600 max-w-[500px]">{step.description}</p>
                </div>
              ))}
            </div>

            {/* Close Button */}
            <div className="mt-8">
              <button
                onClick={() => setShowGuide(false)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Leaderboard */}
      {showLeaderboard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={modalRef}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl w-[90%] md:w-[700px] max-h-[90vh] overflow-auto flex flex-col items-center text-center shadow-2xl"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-6">LEADERBOARD</h1>
            <div className="w-full">
              {/* Header Row */}
              <div className="grid grid-cols-5 gap-4 font-semibold text-gray-700 mb-4 bg-white/80 backdrop-blur-sm py-3 rounded-lg">
                <div className="text-center">Rank</div>
                <div className="text-center">Player</div>
                <div className="text-center">Score</div>
                <div className="text-center">Badges</div>
                <div className="text-center">Levels</div>
              </div>

              {/* Player Rows */}
              {leaderboardData.map((player) => (
                <div 
                  key={player.rank} 
                  className="grid grid-cols-5 gap-4 items-center p-4 bg-white/90 hover:bg-white transition-all duration-200 rounded-lg mb-2 shadow-sm"
                >
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold shadow-md">
                      {player.rank}
                    </div>
                  </div>
                  <div className="text-gray-700 font-medium">{player.name}</div>
                  <div className="text-blue-600 font-bold text-lg">{player.score}</div>
                  <div className="text-green-600 font-bold">{player.badges}</div>
                  <div className="text-purple-600 font-bold">{player.levels}</div>
                </div>
              ))}
            </div>

            {/* Close Button */}
            <div className="mt-8">
              <button
                onClick={() => setShowLeaderboard(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}