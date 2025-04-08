"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Trophy, User, Gamepad2, BookText, MessageSquare, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation" // Import useRouter

export default function BoxButtons() {
  const [activeButton, setActiveButton] = useState<string | null>(null)
  const [stars, setStars] = useState<{ top: string; left: string; opacity: number }[]>([])
  const router = useRouter() // Initialize the router

  // Generate stars only on the client side
  useEffect(() => {
    const generatedStars = Array.from({ length: 100 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.5,
    }))
    setStars(generatedStars)
  }, [])

  const buttons = [
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "profile", label: "Profile", icon: User },
    { id: "minigames", label: "Minigames", icon: Gamepad2 },
    { id: "storyline", label: "Storyline", icon: BookText },
    { id: "feedback", label: "Feedback", icon: MessageSquare },
    { id: "about", label: "About Us", icon: Info },
  ]

  const handleClick = (id: string) => {
    setActiveButton(id)

    // Navigate to the leaderboard page when the "Leaderboard" button is clicked
    if (id === "leaderboard") {
      router.push("/leaderboard")
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Stars */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: star.top,
            left: star.left,
            opacity: star.opacity,
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Content Container */}
      <div className="w-full max-w-4xl mx-auto p-4 relative z-10">
        {/* Heading: English Adventure! */}
        <motion.h1
          className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          English Adventure!
        </motion.h1>

        {/* Button Grid */}
        <div className="grid grid-cols-3 gap-6">
          {buttons.map((button) => {
            const Icon = button.icon
            const isActive = activeButton === button.id

            return (
              <motion.button
                key={button.id}
                onClick={() => handleClick(button.id)}
                className={cn(
                  "flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-colors duration-200",
                  "aspect-square shadow-md hover:shadow-lg",
                  isActive
                    ? "bg-gradient-to-br from-purple-800 to-blue-900 border-purple-500 text-white"
                    : "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-purple-500/50 text-white",
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className={cn("w-12 h-12 mb-3", isActive ? "text-purple-400" : "text-gray-400")} />
                </motion.div>
                <span className="text-base font-medium">{button.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}