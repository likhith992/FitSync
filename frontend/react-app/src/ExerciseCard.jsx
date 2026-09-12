import { Link } from "react-router-dom";

function ExerciseCard(props) {
    return (
        <div>
            <h3>
                <Link to={`/exercise/${props.name}`}>
                    {props.name}
                </Link>
            </h3>

            <p>Sets: {props.sets}</p>
            <p>Reps: {props.reps}</p>

            <button onClick={() => props.onComplete(props.name)}>
                Complete Exercise
            </button>
        </div>
    );
}

export default ExerciseCard;