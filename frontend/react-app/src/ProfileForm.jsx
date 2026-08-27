import { useState } from "react";

function ProfileForm() {
    const [name, setName] = useState("");

    return (
        <div>
            <h2>FitSync Profile</h2>

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
        </div>
    );
}

export default ProfileForm;