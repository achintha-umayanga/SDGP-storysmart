interface MidSectionProps {
    showAboutContent: boolean
    isPlayMode: boolean
    onGetStarted: () => void
  }
  
  export default function MidSection({ showAboutContent, isPlayMode , onGetStarted}: MidSectionProps) {
    if (showAboutContent) {
      return (
        <div className="w-full p-8 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">About Us</h1>
          <div className="w-16 h-1 bg-orange-500 mb-6"></div>
          <div className="max-w-4xl text-2xl text-center text-gray-700 space-y-4">
            <p>
              We believe learning should be an adventure. Our platform combines storytelling,
               games, and education to make learning engaging and fun for all ages. StorySmart is a 
               groundbreaking learning platform designed to redefine the online education experience.
            </p>
            <p>
              By combining storytelling, gamification, and advanced technology, 
              we make learning exciting, engaging, and effective. Our mission is to transform education into an adventure, where users are not 
              just learners but active participants in immersive, story-driven challenges.
            </p>
            <p>
              We aim to address common issues in online learning, such as low engagement and poor knowledge retention, 
              by offering an interactive and personalized approach. Whether you’re a student, parent, or lifelong learner, 
              StorySmart provides a fun and impactful way to achieve your educational goals.
            </p>
          </div>
        </div>
      );
    }
  
    if (isPlayMode) {
      return (
        <div className="flex flex-col w-full h-[80vh] overflow-y-auto mt-4 md:mt-12"> {/* No background color here */}
          {/* Heading */}
          <div className="w-full text-center mb-6 md:mb-10">
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-700 font-serif italic">
              Welcome to the Adventures of Elaria
            </h1>
          </div>
  
          {/* Section 1, Unit 1 */}
          <div className="w-full bg-orange-400 text-white p-3 md:p-4 flex justify-between items-center rounded-lg mb-4 md:mb-8">
            <div>
              <p className="text-xs md:text-sm font-semibold">SECTION 1, UNIT 1</p>
              <h1 className="text-lg md:text-xl font-bold">The Whispering Woods</h1>
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

        </div>
      )
    }
  
    // Display the welcome message with background color for the entire MidSection
    return (
      <div className="flex flex-col items-center justify-center h-full -mt-16"> {/* Negative margin to move content up */}
        <h1 className="text-4xl md:text-8xl font-bold text-gray-900 mb-4 text-center font-serif italic 
        bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
        Embark on Your
      </h1>
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 text-center font-serif italic
       bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
        Learning Adventure
      </h1>
      <p className="text-gray-700 text-lg md:text-xl text-center max-w-2xl leading-relaxed
       bg-white backdrop-blur-sm px-6 py-4 rounded-lg border border-gray-200 shadow-sm">
        Experience story-driven challenges that make learning exciting, fun, and memorable.
      </p>
      <button 
        onClick={onGetStarted} // Add this click handler
        className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold text-lg
         hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
      >
        Get Started
      </button>
    </div>
    )
}   