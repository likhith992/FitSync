import ProfileForm from "./ProfileForm";
import { useState } from "react";
import ExerciseCard from "./ExerciseCard";
import { ProfileProvider } from "./ProfileContext";

function App() {
    const [day, setDay] = useState("Monday");
    const [name, setName] = useState("");

    const [exercises, setExercises] = useState([
        {
            name: "Bench Press",
            sets: 3,
            reps: 8
        },
        {
            name: "Incline Dumbbell Press",
            sets: 3,
            reps: 10
        },
        {
            name: "Push Ups",
            sets: 3,
            reps: 12
        }
    ]);

    const hasWorkout = exercises.length > 0;

    function addExercise() {
        setExercises(prevExercises => [
            ...prevExercises,
            {
                name: "Tricep Pushdown",
                sets: 3,
                reps: 12
            }
        ]);
    }

    function updateExercise() {
        setExercises(prevExercises =>
            prevExercises.map(exercise =>
                exercise.name === "Bench Press"
                    ? { ...exercise, sets: 4 }
                    : exercise
            )
        );
    }

    function removeExercise() {
    setExercises(prevExercises =>
        prevExercises.filter(exercise =>
            exercise.name !== "Push Ups"
        )
    );
}

function completeExercise(exerciseName) {
    console.log(exerciseName + " completed!");
}

    return (
         <ProfileProvider>
        <div>
            <h1>FitSync Workout Planner</h1>

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
                Update Bench Press
            </button>

            <button onClick={removeExercise}>
                Remove Push Ups
            </button>

            {exercises.map((exercise) => (
                <ExerciseCard
                    key={exercise.name}
                    name={exercise.name}
                    sets={exercise.sets}
                    reps={exercise.reps}
                    onComplete={completeExercise}
                />
            ))}

            <ProfileForm
                name={name}
                setName={setName}
            />
        </div>
        </ProfileProvider>
    );
}

export default App;