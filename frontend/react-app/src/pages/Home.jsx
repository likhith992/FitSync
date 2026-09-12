import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (
        <div>
            <h1>FitSync Home</h1>

            <p>Welcome to FitSync!</p>

            <button onClick={() => navigate("/workout")}>
                Start Workout
            </button>
        </div>
    );
}

export default Home;