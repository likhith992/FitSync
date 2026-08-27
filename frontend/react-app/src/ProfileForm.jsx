import { useState } from "react";

function ProfileForm() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        console.log("Name:", name);
        console.log("Age:", age);
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

                <button type="submit">
                    Create Profile
                </button>

            </form>
        </div>
    );
}

export default ProfileForm;