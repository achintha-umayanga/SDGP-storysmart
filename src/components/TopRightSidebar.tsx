import { Flame, Gem, Heart, Lock, Bolt } from "lucide-react"

interface TopRightSidebarProps {
  setShowAboutContent: (value: boolean) => void
}

export function TopRightSidebar({ setShowAboutContent }: TopRightSidebarProps) {
  return (
    <div className="flex flex-col h-full w-full max-w-xs space-y-6">
      {/* Top Icons (Streak, Gems, Hearts) */}
      <div className="flex items-center justify-around">
        <div className="flex items-center space-x-1">
          <Flame className="h-6 w-6 text-orange-500" />
          <span className="text-orange-500 font-bold">1</span>
        </div>

        <div className="flex items-center space-x-1">
          <Gem className="h-6 w-6 text-blue-500" />
          <span className="text-blue-500 font-bold">505</span>
        </div>

        <div className="flex items-center space-x-1">
          <Heart className="h-6 w-6 text-red-500" />
          <span className="text-red-500 font-bold">3</span>
        </div>
      </div>

      {/* Super Offer Section */}
      <div className="bg-green-100 p-4 rounded-lg shadow-md">
        <h3 className="text-green-600 font-bold text-lg mb-3">🔥 Try Premium for Free!</h3>
        <p className="text-gray-600 text-sm mb-3">No ads, personalized practice, and unlimited challenges!</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Try 2 Weeks Free
        </button>
      </div>

      {/* Unlock Leaderboards Section */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-gray-700 font-bold text-lg mb-2">🏆 Unlock Leaderboards!</h3>
        <p className="text-gray-600 text-sm">Complete 5 more lessons to start competing.</p>
        <div className="flex items-center mt-2">
          <Lock className="h-6 w-6 text-gray-400" />
          <span className="ml-2 text-gray-500">Locked</span>
        </div>
      </div>

      {/* Daily Quests Section */}
      <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
        <h3 className="text-yellow-600 font-bold text-lg mb-2">⚡ Daily Rewards</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bolt className="h-6 w-6 text-yellow-500" />
            <span className="ml-2 text-yellow-700">Earn 10 XP</span>
          </div>
          <div className="text-yellow-700">0 / 10</div>
        </div>
        <div className="mt-2 bg-gray-300 rounded-full h-2 w-full">
          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "0%" }}></div>
        </div>
      </div>

      {/* Footer Links - Push to Bottom */}
     
    </div>
  )
}