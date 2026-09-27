import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/exercises/";

function Workout() {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedDay, setSelectedDay] = useState("Monday");

    const [newExercise, setNewExercise] = useState({
        name: "",
        sets: 3,
        reps: 10,
    });

    // -----------------------------------
    // LOAD EXERCISES
    // -----------------------------------
    const loadExercises = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Failed to load exercises");
            }

            const data = await response.json();

            setExercises(data);
        } catch (err) {
            console.error(err);
            setError("Could not connect to Django API.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExercises();
    }, []);

    // -----------------------------------
    // ADD EXERCISE
    // -----------------------------------
    const addExercise = async () => {
        const name = prompt("Enter exercise name:");

        if (!name || !name.trim()) {
            return;
        }

        const sets = prompt("Enter number of sets:", "3");
        const reps = prompt("Enter number of reps:", "10");

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.trim(),
                    sets: Number(sets) || 3,
                    reps: Number(reps) || 10,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to add exercise");
            }

            setExercises((previous) => [
                ...previous,
                data,
            ]);

        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    // -----------------------------------
    // UPDATE EXERCISE
    // -----------------------------------
    const updateExercise = async (exercise) => {
        const name = prompt(
            "Enter new exercise name:",
            exercise.name
        );

        if (name === null) {
            return;
        }

        const sets = prompt(
            "Enter number of sets:",
            exercise.sets
        );

        if (sets === null) {
            return;
        }

        const reps = prompt(
            "Enter number of reps:",
            exercise.reps
        );

        if (reps === null) {
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: exercise.id,
                    name: name.trim(),
                    sets: Number(sets),
                    reps: Number(reps),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to update exercise"
                );
            }

            setExercises((previous) =>
                previous.map((item) =>
                    item.id === exercise.id
                        ? data
                        : item
                )
            );

        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    // -----------------------------------
    // DELETE EXERCISE
    // -----------------------------------
    const deleteExercise = async (exerciseId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to remove this exercise?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: exerciseId,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to delete exercise"
                );
            }

            setExercises((previous) =>
                previous.filter(
                    (exercise) => exercise.id !== exerciseId
                )
            );

        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    // -----------------------------------
    // COMPLETE EXERCISE
    // -----------------------------------
    const completeExercise = async (exercise) => {
        try {
            const response = await fetch(API_URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: exercise.id,
                    completed: !exercise.completed,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to update exercise"
                );
            }

            setExercises((previous) =>
                previous.map((item) =>
                    item.id === exercise.id
                        ? data
                        : item
                )
            );

        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    // -----------------------------------
    // PAGE
    // -----------------------------------
    return (
        <div
            style={{
                maxWidth: "900px",
                margin: "0 auto",
                padding: "40px 20px",
                textAlign: "center",
            }}
        >
            <h1>FitSync Workout Planner</h1>

            <h2>{selectedDay}'s Workout</h2>

            <select
                value={selectedDay}
                onChange={(e) =>
                    setSelectedDay(e.target.value)
                }
            >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>

            <p>
                {loading
                    ? "Loading workout..."
                    : "Workout Ready!"}
            </p>

            {/* ADD BUTTON */}
            <button
                onClick={addExercise}
                style={{ margin: "5px" }}
            >
                Add Exercise
            </button>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            {/* EXERCISES */}
            {!loading &&
                exercises.length === 0 && (
                    <p>No exercises found.</p>
                )}

            {exercises.map((exercise) => (
                <div
                    key={exercise.id}
                    style={{
                        margin: "30px 0",
                        padding: "20px",
                    }}
                >
                    <h3
                        style={{
                            textDecoration:
                                exercise.completed
                                    ? "line-through"
                                    : "none",
                        }}
                    >
                        {exercise.name}
                    </h3>

                    <p>
                        Sets: {exercise.sets}
                    </p>

                    <p>
                        Reps: {exercise.reps}
                    </p>

                    {/* COMPLETE */}
                    <button
                        onClick={() =>
                            completeExercise(exercise)
                        }
                        style={{ margin: "5px" }}
                    >
                        {exercise.completed
                            ? "Completed ✓"
                            : "Complete Exercise"}
                    </button>

                    {/* UPDATE */}
                    <button
                        onClick={() =>
                            updateExercise(exercise)
                        }
                        style={{ margin: "5px" }}
                    >
                        Update
                    </button>

                    {/* DELETE */}
                    <button
                        onClick={() =>
                            deleteExercise(exercise.id)
                        }
                        style={{ margin: "5px" }}
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Workout;