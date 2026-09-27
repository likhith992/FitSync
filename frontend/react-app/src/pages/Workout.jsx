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
    // LOAD EXERCISES FOR SELECTED DAY
    // -----------------------------------
    const loadExercises = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}?day=${encodeURIComponent(selectedDay)}`
            );

            if (!response.ok) {
                throw new Error("Failed to load exercises");
            }

            const data = await response.json();

            setExercises(data);
        } catch (err) {
            console.error(err);
            setError("Could not connect to Django API.");
            setExercises([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExercises();
    }, [selectedDay]);

    // -----------------------------------
    // ADD EXERCISE
    // -----------------------------------
    const addExercise = async () => {
        if (!newExercise.name.trim()) {
            setError("Please enter an exercise name.");
            return;
        }

        try {
            setError("");

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: newExercise.name.trim(),
                    sets: Number(newExercise.sets),
                    reps: Number(newExercise.reps),
                    day: selectedDay,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to add exercise"
                );
            }

            setExercises((previous) => [
                ...previous,
                data,
            ]);

            setNewExercise({
                name: "",
                sets: 3,
                reps: 10,
            });
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
            setError("");

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
                    day: selectedDay,
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
            setError("");

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
            setError("");

            const response = await fetch(API_URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: exercise.id,
                    completed: !exercise.completed,
                    day: selectedDay,
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

            {/* ADD EXERCISE */}
            <div
                style={{
                    maxWidth: "650px",
                    margin: "20px auto",
                    padding: "24px",
                    border: "1px solid #ddd",
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    boxShadow:
                        "0 4px 12px rgba(0, 0, 0, 0.08)",
                    textAlign: "left",
                }}
            >
                <h3 style={{ marginTop: 0 }}>
                    Add New Exercise
                </h3>

                <input
                    type="text"
                    placeholder="Exercise name"
                    value={newExercise.name}
                    onChange={(e) =>
                        setNewExercise({
                            ...newExercise,
                            name: e.target.value,
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        boxSizing: "border-box",
                    }}
                />

                <input
                    type="number"
                    min="1"
                    placeholder="Sets"
                    value={newExercise.sets}
                    onChange={(e) =>
                        setNewExercise({
                            ...newExercise,
                            sets: e.target.value,
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        boxSizing: "border-box",
                    }}
                />

                <input
                    type="number"
                    min="1"
                    placeholder="Reps"
                    value={newExercise.reps}
                    onChange={(e) =>
                        setNewExercise({
                            ...newExercise,
                            reps: e.target.value,
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        boxSizing: "border-box",
                    }}
                />

                <button
                    onClick={addExercise}
                    style={{
                        padding: "10px 16px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Add Exercise
                </button>
            </div>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            {/* EXERCISES */}
            {!loading &&
                exercises.length === 0 && (
                    <p>
                        No exercises found for{" "}
                        {selectedDay}.
                    </p>
                )}

            {exercises.map((exercise) => (
                <div
                    key={exercise.id}
                    style={{
                        margin: "20px auto",
                        padding: "24px",
                        maxWidth: "650px",
                        border: "1px solid #ddd",
                        borderRadius: "16px",
                        backgroundColor:
                            exercise.completed
                                ? "#f0fdf4"
                                : "#ffffff",
                        boxShadow:
                            "0 4px 12px rgba(0, 0, 0, 0.08)",
                        textAlign: "left",
                    }}
                >
                    {/* Exercise name */}
                    <h3
                        style={{
                            margin: "0 0 12px 0",
                            fontSize: "22px",
                            textDecoration:
                                exercise.completed
                                    ? "line-through"
                                    : "none",
                        }}
                    >
                        {exercise.name}
                    </h3>

                    {/* Sets and reps */}
                    <div
                        style={{
                            display: "flex",
                            gap: "30px",
                            marginBottom: "20px",
                            color: "#555",
                        }}
                    >
                        <span>
                            <strong>Sets:</strong>{" "}
                            {exercise.sets}
                        </span>

                        <span>
                            <strong>Reps:</strong>{" "}
                            {exercise.reps}
                        </span>
                    </div>

                    {/* Buttons */}
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                        }}
                    >
                        <button
                            onClick={() =>
                                completeExercise(exercise)
                            }
                            style={{
                                padding: "10px 16px",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            {exercise.completed
                                ? "Completed ✓"
                                : "Complete Exercise"}
                        </button>

                        <button
                            onClick={() =>
                                updateExercise(exercise)
                            }
                            style={{
                                padding: "10px 16px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                backgroundColor: "#fff",
                                cursor: "pointer",
                            }}
                        >
                            Update
                        </button>

                        <button
                            onClick={() =>
                                deleteExercise(
                                    exercise.id
                                )
                            }
                            style={{
                                padding: "10px 16px",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Workout;