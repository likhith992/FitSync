import { Routes, Route, Link } from "react-router-dom";
import { ProfileProvider } from "./ProfileContext";

import Home from "./pages/Home";
import Workout from "./pages/Workout";
import Profile from "./pages/Profile";
import Exercise from "./pages/Exercise";

function App() {
    return (
        <ProfileProvider>

            <nav>
                <Link to="/">Home</Link>
                {" | "}
                <Link to="/workout">Workout</Link>
                {" | "}
                <Link to="/profile">Profile</Link>
            </nav>

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/workout" element={<Workout />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/exercise/:exerciseName" element={<Exercise />} />

            </Routes>

        </ProfileProvider>
    );
}

export default App;