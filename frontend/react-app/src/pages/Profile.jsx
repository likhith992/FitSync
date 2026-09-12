import ProfileForm from "../ProfileForm";
import ProfileSummary from "../ProfileSummary";

function Profile() {
    return (
        <div>
            <h1>FitSync Profile</h1>

            <ProfileForm />

            <ProfileSummary />
        </div>
    );
}

export default Profile;