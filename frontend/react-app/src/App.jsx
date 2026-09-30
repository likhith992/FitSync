import { Routes, Route, Link, NavLink, useLocation  } from "react-router-dom";
import { ProfileProvider } from "./ProfileContext";

import Home from "./pages/Home";
import Workout from "./pages/Workout";
import Profile from "./pages/Profile";
import Diet from "./pages/Diet";
import Exercise from "./pages/Exercise";
import NotFound from "./pages/NotFound";
import TodayWorkout from "./pages/TodayWorkout";
import ApiPractice from "./pages/ApiPractice";

function App() {
    const location = useLocation();
    return (
        <ProfileProvider>

            <nav>
    <NavLink to="/">Home</NavLink>
    {" | "}

    <NavLink
        to="/workout"
        className={({ isActive }) =>
            isActive ? "active" : ""
        }
    >
        Workout
    </NavLink>

    {" | "}
    <NavLink to="/profile">Profile</NavLink>

    <p>Current page: {location.pathname}</p>
</nav>

           <Routes>

    <Route path="/" element={<Home />} />

    <Route path="/workout" element={<Workout />}>

        <Route path="today" element={<TodayWorkout />} />

    </Route>

    <Route path="/profile" element={<Profile />} />

    <Route path="/diet" element={<Diet />} />

    <Route
    path="/exercise/:exerciseId/:exerciseName"
    element={<Exercise />}
/>

<Route path="/api-practice" element={<ApiPractice />} />
    <Route path="*" element={<NotFound />} />

</Routes>
        </ProfileProvider>
    );
}

export default App;