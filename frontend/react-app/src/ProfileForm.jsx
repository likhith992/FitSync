import { useState, useRef } from "react";
import useProfile from "./useProfile";
import useProfileLogger from "./useProfileLogger";

function ProfileForm()  {
    const {
    profile,
    setName,
    setAge,
    setHeight,
    setWeight
} = useProfile();

    const [profileCreated, setProfileCreated] = useState(false);

    const nameInputRef = useRef(null);

  useProfileLogger(profile.name);

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Name:", profile.name);
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
                  value={profile.name}
onChange={(event) =>
    setName(event.target.value)
}
                />

                <button
                    type="button"
                    onClick={() => nameInputRef.current.focus()}
                >
                    Focus Name
                </button>

              <p>Your name: {profile.name}</p>

                <label>Age:</label>

               <input
    type="number"
    value={profile.age}
    onChange={(event) =>
    setAge(event.target.value)
}
/>

                <p>Your age: {profile.age}</p>

                <label>Height (cm):</label>

                <input
    type="number"
    value={profile.height}
  onChange={(event) =>
    setHeight(event.target.value)
}
/>

                <p>Your height: {profile.height} cm</p>

                <label>Weight (kg):</label>

               <input
    type="number"
    value={profile.weight}
   onChange={(event) =>
    setWeight(event.target.value)
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
                    <p>Name: {profile.name}</p>
                    <p>Age: {profile.age}</p>
                    <p>Height: {profile.height} cm</p>
                    <p>Weight: {profile.weight} kg</p>
                </div>
            )}

        </div>
    );
}

export default ProfileForm;