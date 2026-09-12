import { Routes, Route } from "react-router-dom";
import { ProfileProvider } from "./ProfileContext";

import Home from "./pages/Home";
import Workout from "./pages/Workout";

function App() {
    return (
        <ProfileProvider>
            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/workout" element={<Workout />} />

            </Routes>
        </ProfileProvider>
    );
}

export default App;