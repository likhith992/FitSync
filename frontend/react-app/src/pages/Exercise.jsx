import { useParams } from "react-router-dom";

function Exercise() {

    const { exerciseName } = useParams();

    return (
        <div>
            <h1>Exercise Details</h1>

            <p>Exercise: {exerciseName}</p>
        </div>
    );
}

export default Exercise;