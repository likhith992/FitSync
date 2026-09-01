function ExerciseCard(props) {
    return (
        <div>
            <h3>{props.name}</h3>
            <p>Sets: {props.sets}</p>
            <p>Reps: {props.reps}</p>
            <button onClick={props.onComplete}>
    Complete Exercise
</button>
        </div>
    );
}

export default ExerciseCard;