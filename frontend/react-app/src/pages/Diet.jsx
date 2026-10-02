import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/meals/";

function Diet() {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Add meal form
    const [name, setName] = useState("");
    const [mealType, setMealType] = useState("Breakfast");
    const [calories, setCalories] = useState("");

    // Edit meal state
    const [editingMealId, setEditingMealId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editMealType, setEditMealType] = useState("Breakfast");
    const [editCalories, setEditCalories] = useState("");

    const loadMeals = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Failed to load meals");
            }

            const data = await response.json();

            setMeals(data);
        } catch (err) {
            console.error(err);
            setError("Could not connect to Django API.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMeals();
    }, []);

    // POST - Add meal
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError("");

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    meal_type: mealType,
                    calories: Number(calories),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add meal");
            }

            const newMeal = await response.json();

            setMeals((previousMeals) => [
                ...previousMeals,
                newMeal,
            ]);

            setName("");
            setMealType("Breakfast");
            setCalories("");
        } catch (err) {
            console.error(err);
            setError("Could not add meal.");
        }
    };

    // DELETE - Remove meal
    const handleDelete = async (mealId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this meal?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            const response = await fetch(
                `${API_URL}${mealId}/`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete meal");
            }

            setMeals((previousMeals) =>
                previousMeals.filter(
                    (meal) => meal.id !== mealId
                )
            );
        } catch (err) {
            console.error(err);
            setError("Could not delete meal.");
        }
    };

    // Start editing a meal
    const startEditing = (meal) => {
        setEditingMealId(meal.id);
        setEditName(meal.name);
        setEditMealType(meal.meal_type);
        setEditCalories(meal.calories);
    };

    // Cancel editing
    const cancelEditing = () => {
        setEditingMealId(null);
        setEditName("");
        setEditMealType("Breakfast");
        setEditCalories("");
    };

    // PUT - Update meal
    const handleUpdate = async (event, mealId) => {
        event.preventDefault();

        try {
            setError("");

            const response = await fetch(
                `${API_URL}${mealId}/`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: editName,
                        meal_type: editMealType,
                        calories: Number(editCalories),
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update meal");
            }

            const updatedMeal = await response.json();

            setMeals((previousMeals) =>
                previousMeals.map((meal) =>
                    meal.id === updatedMeal.id
                        ? updatedMeal
                        : meal
                )
            );

            cancelEditing();
        } catch (err) {
            console.error(err);
            setError("Could not update meal.");
        }
    };

    return (
        <div
            style={{
                maxWidth: "900px",
                margin: "0 auto",
                padding: "40px 20px",
                textAlign: "center",
            }}
        >
            <h1>FitSync Diet</h1>

            <p>
                {loading
                    ? "Loading meals..."
                    : "Meals loaded successfully!"}
            </p>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            {/* Add Meal Form */}
            <form
                onSubmit={handleSubmit}
                style={{
                    maxWidth: "650px",
                    margin: "30px auto",
                    padding: "24px",
                    border: "1px solid #ddd",
                    borderRadius: "16px",
                    backgroundColor: "#f9f9f9",
                    textAlign: "left",
                }}
            >
                <h2>Add Meal</h2>

                <div style={{ marginBottom: "16px" }}>
                    <label>
                        <strong>Meal Name</strong>
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        placeholder="Example: Oatmeal"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            boxSizing: "border-box",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "16px" }}>
                    <label>
                        <strong>Meal Type</strong>
                    </label>

                    <select
                        value={mealType}
                        onChange={(event) =>
                            setMealType(event.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                        }}
                    >
                        <option value="Breakfast">
                            Breakfast
                        </option>
                        <option value="Lunch">
                            Lunch
                        </option>
                        <option value="Dinner">
                            Dinner
                        </option>
                        <option value="Snack">
                            Snack
                        </option>
                    </select>
                </div>

                <div style={{ marginBottom: "16px" }}>
                    <label>
                        <strong>Calories</strong>
                    </label>

                    <input
                        type="number"
                        value={calories}
                        onChange={(event) =>
                            setCalories(event.target.value)
                        }
                        placeholder="Example: 300"
                        min="0"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            boxSizing: "border-box",
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        cursor: "pointer",
                    }}
                >
                    Add Meal
                </button>
            </form>

            {/* Meal List */}
            {!loading && meals.length === 0 && (
                <p>No meals found.</p>
            )}

            {meals.map((meal) => (
                <div
                    key={meal.id}
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
                    {editingMealId === meal.id ? (
                        /* Edit form */
                        <form
                            onSubmit={(event) =>
                                handleUpdate(event, meal.id)
                            }
                        >
                            <h3>Edit Meal</h3>

                            <div
                                style={{
                                    marginBottom: "12px",
                                }}
                            >
                                <label>
                                    <strong>Meal Name</strong>
                                </label>

                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(event) =>
                                        setEditName(
                                            event.target.value
                                        )
                                    }
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        marginTop: "6px",
                                        boxSizing:
                                            "border-box",
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    marginBottom: "12px",
                                }}
                            >
                                <label>
                                    <strong>
                                        Meal Type
                                    </strong>
                                </label>

                                <select
                                    value={editMealType}
                                    onChange={(event) =>
                                        setEditMealType(
                                            event.target.value
                                        )
                                    }
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        marginTop: "6px",
                                    }}
                                >
                                    <option value="Breakfast">
                                        Breakfast
                                    </option>
                                    <option value="Lunch">
                                        Lunch
                                    </option>
                                    <option value="Dinner">
                                        Dinner
                                    </option>
                                    <option value="Snack">
                                        Snack
                                    </option>
                                </select>
                            </div>

                            <div
                                style={{
                                    marginBottom: "12px",
                                }}
                            >
                                <label>
                                    <strong>
                                        Calories
                                    </strong>
                                </label>

                                <input
                                    type="number"
                                    value={editCalories}
                                    onChange={(event) =>
                                        setEditCalories(
                                            event.target.value
                                        )
                                    }
                                    min="0"
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        marginTop: "6px",
                                        boxSizing:
                                            "border-box",
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                style={{
                                    padding: "8px 16px",
                                    marginRight: "10px",
                                    cursor: "pointer",
                                }}
                            >
                                Save Changes
                            </button>

                            <button
                                type="button"
                                onClick={cancelEditing}
                                style={{
                                    padding: "8px 16px",
                                    cursor: "pointer",
                                }}
                            >
                                Cancel
                            </button>
                        </form>
                    ) : (
                        /* Normal meal display */
                        <>
                            <h3>{meal.name}</h3>

                            <p>
                                <strong>
                                    Meal Type:
                                </strong>{" "}
                                {meal.meal_type}
                            </p>

                            <p>
                                <strong>
                                    Calories:
                                </strong>{" "}
                                {meal.calories} kcal
                            </p>

                            <button
                                onClick={() =>
                                    startEditing(meal)
                                }
                                style={{
                                    padding: "8px 16px",
                                    marginRight: "10px",
                                    cursor: "pointer",
                                }}
                            >
                                Edit Meal
                            </button>

                            <button
                                onClick={() =>
                                    handleDelete(meal.id)
                                }
                                style={{
                                    padding: "8px 16px",
                                    cursor: "pointer",
                                }}
                            >
                                Delete Meal
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Diet;