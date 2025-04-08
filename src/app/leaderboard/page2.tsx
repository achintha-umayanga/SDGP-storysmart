"use client"

import { motion } from "framer-motion"
// import { cn } from "@/lib/utils" // Removed as it is unused and causing an error

// Mock leaderboard data
const leaderboardData = [
  { rank: 1, name: "AstroKid123", score: 950 },
  { rank: 2, name: "GalaxyGirl", score: 890 },
  { rank: 3, name: "CosmoMaster", score: 840 },
  { rank: 4, name: "StarChaser", score: 790 },
  { rank: 5, name: "OrbitHero", score: 730 },
]

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Stars */}
      {Array.from({ length: 100 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.5,
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Content Container */}
      <div className="w-full max-w-4xl mx-auto p-4 relative z-10">
        {/* Heading: Leaderboard */}
        <motion.h1
          className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Leaderboard
        </motion.h1>

        {/* Leaderboard Table */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 p-6">
          <div className="grid grid-cols-3 gap-4 text-lg font-semibold text-gray-300 mb-4">
            <span>Rank</span>
            <span>Name</span>
            <span className="text-right">Score</span>
          </div>
          {leaderboardData.map((entry) => (
            <motion.div
              key={entry.rank}
              className="grid grid-cols-3 gap-4 items-center p-4 rounded-lg hover:bg-gray-700/50 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-purple-400 font-bold">#{entry.rank}</span>
              <span className="text-gray-200">{entry.name}</span>
              <span className="text-right text-yellow-400">{entry.score} points</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}