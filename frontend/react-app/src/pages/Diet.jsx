import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/meals/";

function Diet() {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
                    <h3>{meal.name}</h3>

                    <p>
                        <strong>Meal Type:</strong>{" "}
                        {meal.meal_type}
                    </p>

                    <p>
                        <strong>Calories:</strong>{" "}
                        {meal.calories} kcal
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Diet;