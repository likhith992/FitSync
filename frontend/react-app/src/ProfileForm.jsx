import { useState } from "react";

function ProfileForm() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    function handleSubmit(event) {
        event.preventDefault();

        console.log("Name:", name);
        console.log("Age:", age);
        console.log("Height:", height);
        console.log("Weight:", weight);
    }

    return (
        <div>
            <h2>FitSync Profile</h2>

            <form onSubmit={handleSubmit}>

                <label>Name:</label>

                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <p>Your name: {name}</p>

                <label>Age:</label>

                <input
                    type="number"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                />

                <p>Your age: {age}</p>

                <label>Height (cm):</label>

                <input
                    type="number"
                    value={height}
                    onChange={(event) => setHeight(event.target.value)}
                />

                <p>Your height: {height} cm</p>

                <label>Weight (kg):</label>

<input
    type="number"
    value={weight}
    onChange={(event) => setWeight(event.target.value)}
/>

<p>Your weight: {weight} kg</p>

                <button type="submit">
                    Create Profile
                </button>

            </form>
        </div>
    );
}

export default ProfileForm;