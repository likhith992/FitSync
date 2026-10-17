import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/meals/";

// Return today's date in YYYY-MM-DD format using the local calendar date.
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function Diet() {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Date whose meals are currently displayed.
    const [selectedDate, setSelectedDate] = useState(getTodayDate());

    // Add meal form state
    const [name, setName] = useState("");
    const [mealType, setMealType] = useState("Breakfast");
    const [calories, setCalories] = useState("");
    const [mealDate, setMealDate] = useState(getTodayDate());

    // Edit meal state
    const [editingMealId, setEditingMealId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editMealType, setEditMealType] = useState("Breakfast");
    const [editCalories, setEditCalories] = useState("");
    const [editMealDate, setEditMealDate] = useState(getTodayDate());

    // Daily Diet Summary: calculated from meals for the selected date.
    const totalCalories = meals.reduce(
        (total, meal) => total + Number(meal.calories || 0),
        0
    );
    const totalMeals = meals.length;

    const loadMeals = async (dateToLoad) => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}?date=${encodeURIComponent(dateToLoad)}`
            );

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
        loadMeals(selectedDate);
    }, [selectedDate]);

    // POST - Add a meal, including its selected date.
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
                    date: mealDate,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add meal");
            }

            const newMeal = await response.json();

            setName("");
            setMealType("Breakfast");
            setCalories("");
            setMealDate(getTodayDate());

            if (mealDate === selectedDate) {
                setMeals((previousMeals) => [...previousMeals, newMeal]);
            } else {
                setSelectedDate(mealDate);
            }
        } catch (err) {
            console.error(err);
            setError("Could not add meal.");
        }
    };

    // DELETE - Remove a meal.
    const handleDelete = async (mealId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this meal?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            const response = await fetch(`${API_URL}${mealId}/`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete meal");
            }

            setMeals((previousMeals) =>
                previousMeals.filter((meal) => meal.id !== mealId)
            );
        } catch (err) {
            console.error(err);
            setError("Could not delete meal.");
        }
    };

    // Load the selected meal's values into the edit form.
    const startEditing = (meal) => {
        setEditingMealId(meal.id);
        setEditName(meal.name);
        setEditMealType(meal.meal_type);
        setEditCalories(String(meal.calories));
        setEditMealDate(meal.date || getTodayDate());
    };

    // Cancel editing and reset the edit form state.
    const cancelEditing = () => {
        setEditingMealId(null);
        setEditName("");
        setEditMealType("Breakfast");
        setEditCalories("");
        setEditMealDate(getTodayDate());
    };

    // PUT - Update meal details, including its date.
    const handleUpdate = async (event, mealId) => {
        event.preventDefault();

        try {
            setError("");

            const response = await fetch(`${API_URL}${mealId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: editName,
                    meal_type: editMealType,
                    calories: Number(editCalories),
                    date: editMealDate,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update meal");
            }

            const updatedMeal = await response.json();

            cancelEditing();

            if (updatedMeal.date !== selectedDate) {
                setSelectedDate(updatedMeal.date);
            } else {
                setMeals((previousMeals) =>
                    previousMeals.map((meal) =>
                        meal.id === updatedMeal.id ? updatedMeal : meal
                    )
                );
            }
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
                {loading ? "Loading meals..." : `Meals for ${selectedDate}`}
            </p>

            {error && (
                <p style={{ color: "red" }} role="alert">
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
                        onChange={(event) => setName(event.target.value)}
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
                        onChange={(event) => setMealType(event.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                        }}
                    >
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Snack">Snack</option>
                    </select>
                </div>

                <div style={{ marginBottom: "16px" }}>
                    <label>
                        <strong>Calories</strong>
                    </label>
                    <input
                        type="number"
                        value={calories}
                        onChange={(event) => setCalories(event.target.value)}
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

                <div style={{ marginBottom: "16px" }}>
                    <label>
                        <strong>Meal Date</strong>
                    </label>
                    <input
                        type="date"
                        value={mealDate}
                        onChange={(event) => setMealDate(event.target.value)}
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
                    style={{ padding: "10px 20px", cursor: "pointer" }}
                >
                    Add Meal
                </button>
            </form>

            {/* Date selector for viewing meals from a particular day. */}
            <div
                style={{
                    maxWidth: "650px",
                    margin: "30px auto",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "16px",
                    textAlign: "left",
                }}
            >
                <label htmlFor="selected-meal-date">
                    <strong>View Meals for Date</strong>
                </label>
                <input
                    id="selected-meal-date"
                    type="date"
                    value={selectedDate}
                    onChange={(event) => setSelectedDate(event.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "6px",
                        boxSizing: "border-box",
                    }}
                />
                <button
                    type="button"
                    onClick={() => setSelectedDate(getTodayDate())}
                    style={{ marginTop: "12px", padding: "8px 16px", cursor: "pointer" }}
                >
                    Show Today
                </button>
            </div>

            {/* Daily Diet Summary */}
            {!loading && (
                <div
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
                    <h2>Daily Diet Summary</h2>

                    <p>
                        <strong>Date:</strong> {selectedDate}
                    </p>

                    <p>
                        <strong>Total Calories:</strong>{" "}
                        {totalCalories} kcal
                    </p>

                    <p>
                        <strong>Meals Logged:</strong>{" "}
                        {totalMeals}
                    </p>
                </div>
            )}

            {/* Meal List: only meals for the selected date. */}
            {!loading && meals.length === 0 && (
                <p>No meals found for {selectedDate}.</p>
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
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                        textAlign: "left",
                    }}
                >
                    {editingMealId === meal.id ? (
                        // Edit meal form
                        <form onSubmit={(event) => handleUpdate(event, meal.id)}>
                            <h3>Edit Meal</h3>

                            <div style={{ marginBottom: "12px" }}>
                                <label>
                                    <strong>Meal Name</strong>
                                </label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(event) => setEditName(event.target.value)}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        marginTop: "6px",
                                        boxSizing: "border-box",
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: "12px" }}>
                                <label>
                                    <strong>Meal Type</strong>
                                </label>
                                <select
                                    value={editMealType}
                                    onChange={(event) => setEditMealType(event.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        marginTop: "6px",
                                    }}
                                >
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Snack">Snack</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: "12px" }}>
                                <label>
                                    <strong>Calories</strong>
                                </label>
                                <input
                                    type="number"
                                    value={editCalories}
                                    onChange={(event) => setEditCalories(event.target.value)}
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

                            <div style={{ marginBottom: "12px" }}>
                                <label>
                                    <strong>Meal Date</strong>
                                </label>
                                <input
                                    type="date"
                                    value={editMealDate}
                                    onChange={(event) => setEditMealDate(event.target.value)}
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
                                style={{ padding: "8px 16px", cursor: "pointer" }}
                            >
                                Cancel
                            </button>
                        </form>
                    ) : (
                        // Normal meal display
                        <>
                            <h3>{meal.name}</h3>

                            <p>
                                <strong>Meal Type:</strong> {meal.meal_type}
                            </p>

                            <p>
                                <strong>Calories:</strong> {meal.calories} kcal
                            </p>

                            <p>
                                <strong>Meal Date:</strong> {meal.date || "Date unavailable"}
                            </p>

                            <button
                                type="button"
                                onClick={() => startEditing(meal)}
                                style={{
                                    padding: "8px 16px",
                                    marginRight: "10px",
                                    cursor: "pointer",
                                }}
                            >
                                Edit Meal
                            </button>

                            <button
                                type="button"
                                onClick={() => handleDelete(meal.id)}
                                style={{ padding: "8px 16px", cursor: "pointer" }}
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
