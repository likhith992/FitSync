import { useContext } from "react";
import { ProfileContext } from "./ProfileContext";

function ProfileSummary() {

    const { profile } = useContext(ProfileContext);

    return (
        <div>
            <h2>Profile Summary</h2>

            <p>Age: {profile.age}</p>
            <p>Height: {profile.height} cm</p>
            <p>Weight: {profile.weight} kg</p>
        </div>
    );
}

export default ProfileSummary;