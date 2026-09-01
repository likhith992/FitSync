import { useState, useEffect, useRef, useContext } from "react";
import { ProfileContext } from "./ProfileContext";

function ProfileForm({ name, setName }) {
    const { profile, setProfile } = useContext(ProfileContext);

   

    const [profileCreated, setProfileCreated] = useState(false);

    const nameInputRef = useRef(null);

    useEffect(() => {
        console.log("Name changed:", name);
    }, [name]);

    function handleSubmit(event) {
        event.preventDefault();

        console.log("Name:", name);
        console.log("Age:", profile.age);
        console.log("Height:", profile.height);
        console.log("Weight:", profile.weight);

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

                <button
                    type="button"
                    onClick={() => nameInputRef.current.focus()}
                >
                    Focus Name
                </button>

                <p>Your name: {name}</p>

                <label>Age:</label>

                <input
                    type="number"
                    value={profile.age}
                    onChange={(event) =>
                        setProfile(prevProfile => ({
                            ...prevProfile,
                            age: event.target.value
                        }))
                    }
                />

                <p>Your age: {profile.age}</p>

                <label>Height (cm):</label>

                <input
                    type="number"
                    value={profile.height}
                    onChange={(event) =>
                        setProfile(prevProfile => ({
                            ...prevProfile,
                            height: event.target.value
                        }))
                    }
                />

                <p>Your height: {profile.height} cm</p>

                <label>Weight (kg):</label>

                <input
                    type="number"
                    value={profile.weight}
                    onChange={(event) =>
                        setProfile(prevProfile => ({
                            ...prevProfile,
                            weight: event.target.value
                        }))
                    }
                />

                <p>Your weight: {profile.weight} kg</p>

                <button type="submit">
                    Create Profile
                </button>

            </form>

            {profileCreated && (
                <div>
                    <h3>Profile Created!</h3>
                    <p>Name: {name}</p>
                    <p>Age: {profile.age}</p>
                    <p>Height: {profile.height} cm</p>
                    <p>Weight: {profile.weight} kg</p>
                </div>
            )}

        </div>
    );
}

export default ProfileForm;