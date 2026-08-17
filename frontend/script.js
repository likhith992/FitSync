const appName = "FitSync";

function calculateProtein(weight) {

    const proteinPerKg = 2;

    return weight * proteinPerKg;
}


function getGoalMessages(goal) {

    if (goal === "Build Muscle") {

        return "Focus on strength training and adequate nutrition.";

    } else if (goal === "Lose Weight") {

        return "Focus on sustainable fat loss and regular activity.";

    } else if (goal === "Maintain Weight") {

        return "Focus on maintaining your current weight and activity.";

    } else if (goal === "Gain Weight") {

        return "Focus on healthy weight gain and strength training.";

    } else {

        return "Please select a valid fitness goal.";

    }
}


const weight =70;
const goal = "Build Muscle";

const proteins = calculateProtein(weight);
const goalMessage = getGoalMessages(goal);

console.log(appName);
console.log("Weight:", weight, "kg");
console.log("Goal:", goal);
console.log("Protein:", protein, "g");
console.log(getGoalMessages);