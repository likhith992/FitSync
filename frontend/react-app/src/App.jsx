import { useState } from "react";
import ExerciseCard from "./ExerciseCard";

function App() {
  const [day, setDay] = useState("Monday");
  const exercises = [
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
  ]
  const hasWorkout = exercises.length > 0;

  return (
    <div>
      <h1>FitSync Workout Planner</h1>

      <h2>{day}'s Workout</h2>
      <button onClick={() => setDay("Wednesday")}>
    Wednesday
</button>
      {hasWorkout ? (
    <p>Workout Ready!</p>
) : (
    <p>No workout available.</p>
)}

      {exercises.map((exercise) => (
    <ExerciseCard
        key={exercise.name}
        name={exercise.name}
        sets={exercise.sets}
        reps={exercise.reps}
    />
))}
    </div>
  )
}

export default App