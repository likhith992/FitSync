import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import ExerciseCard from "../ExerciseCard";

function Workout() {
    const [day, setDay] = useState("Monday");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

   const [exercises, setExercises] = useState([]);

   async function getExercises() {

    try {

        setLoading(true);
        setError("");

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch exercises");
        }

        const data = await response.json();

        const exerciseData = data.slice(0, 3).map((user, index) => ({
            id: user.id,
            name: user.name,
            sets: 3,
            reps: 8 + index * 2
        }));

        setExercises(exerciseData);

    } catch (error) {

        setError(error.message);

    } finally {

        setLoading(false);

    }
}

useEffect(() => {
    getExercises();
}, []);

    const hasWorkout = exercises.length > 0;

    function addExercise() {
        setExercises(prevExercises => [
            ...prevExercises,
            {
                 id: Date.now(),
                name: "Tricep Pushdown",
                sets: 3,
                reps: 12
            }
        ]);
    }

    function updateExercise() {
    setExercises(prevExercises =>
        prevExercises.map(exercise =>
            exercise.id === 1
                ? { ...exercise, sets: 4 }
                : exercise
        )
    );
}

    function removeExercise() {
    setExercises(prevExercises =>
        prevExercises.filter(exercise =>
            exercise.id !== 3
        )
    );
}

    function completeExercise(exerciseName) {
        console.log(exerciseName + " completed!");
    }

    return (
        <div>
            <h1>FitSync Workout Planner</h1>
            {error && <p>{error}</p>}
{loading && <p>Loading exercises...</p>}

            <h2>{day}'s Workout</h2>

            <select onChange={(event) => setDay(event.target.value)}>
                <option value="Monday">Monday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Friday">Friday</option>
            </select>

            {hasWorkout ? (
                <p>Workout Ready!</p>
            ) : (
                <p>No workout available.</p>
            )}

            <button onClick={addExercise}>
                Add Exercise
            </button>

            <button onClick={updateExercise}>
    Update First Exercise
</button>

<button onClick={removeExercise}>
    Remove Third Exercise
</button>

            {exercises.map((exercise) => (
                <ExerciseCard
                    key={exercise.id}
                     id={exercise.id}
                    name={exercise.name}
                    sets={exercise.sets}
                    reps={exercise.reps}
                    onComplete={completeExercise}
                />
            ))}

            <Outlet />
            
        </div>
    );
}

export default Workout;