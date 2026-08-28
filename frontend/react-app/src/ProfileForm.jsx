import { useState, useEffect, useRef } from "react";

function ProfileForm() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [profileCreated, setProfileCreated] = useState(false);

    const nameInputRef = useRef(null);
 
    useEffect(() => {
    console.log("Name changed:", name);
}, [name]);

    function handleSubmit(event) {
        event.preventDefault();

        console.log("Name:", name);
        console.log("Age:", age);
        console.log("Height:", height);
        console.log("Weight:", weight);
        setProfileCreated(true);
    }
       
    return (
        <div>
            <h2>FitSync Profile</h2>

            <form onSubmit={handleSubmit}>

                <label>Name:</label>

                <input
                    ref={nameInputRef}
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <button onClick={() => nameInputRef.current.focus()}>
                Focus Name
                </button>

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
            {profileCreated && (
    <div>
        <h3>Profile Created!</h3>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>Height: {height} cm</p>
        <p>Weight: {weight} kg</p>
    </div>
)}

        </div>
    );
}

export default ProfileForm;