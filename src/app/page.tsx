"use client"

import { useState } from "react"
import MidSection from "@/components/MidSection"
import { Sidebar } from "@/components/sidebar"
import { TopRightSidebar } from "@/components/TopRightSidebar"

export default function HomePage() {
  const [showAboutContent, setShowAboutContent] = useState(false)
  const [isPlayMode, setIsPlayMode] = useState(false)

  return (
    <div className="flex h-screen max-w-[100vw] overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        setShowPlayContentAction={() => {
          setIsPlayMode(true)
          setShowAboutContent(false)
        }} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row min-w-0 relative">
        {/* MidSection with Scrollable Content */}
        <div className="flex-1 pl-8 md:pl-24 pr-4 md:pr-8 py-4 md:py-17 min-w-0 h-full">
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 pr-4">
            <MidSection 
              showAboutContent={showAboutContent} 
              isPlayMode={isPlayMode}
              onGetStarted={() => setIsPlayMode(true)} 
            />
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px bg-gray-300 shrink-0 mx-4 md:mx-8"></div>

        {/* Right section */}
        <div className="hidden md:block w-[280px] pl-1 pr-6 py-7 shrink-0">
          <TopRightSidebar setShowAboutContent={setShowAboutContent} />
        </div>
      </div>
    </div>
  )
}