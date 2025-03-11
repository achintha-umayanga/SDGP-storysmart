import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MiniGames from './Minigames.jsx';
import MysteryWordGame from './MisteryWordGame.jsx';
import RolePlayGame from './RolePlayGame.jsx';
import StoryCompletionGame from './StoryCompletionGame.jsx';
import ProfilePage from './ProfilePage.jsx';
import StoryLine from "./StoryLine.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MiniGames />} />
                <Route path="/mystery-word-game" element={<MysteryWordGame />} />
                <Route path="/role-play-game" element={<RolePlayGame />} />
                <Route path="/story-completion-game" element={<StoryCompletionGame />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/story" element={<StoryLine />} />
            </Routes>
        </Router>
    );
}

export default App;