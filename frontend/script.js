const appName = "FitSync";

let weight = 70;
let goal = "Build Muscle";

console.log(appName);
console.log("Weight:", weight);
console.log("Goal:", goal);

if (goal === "Build Muscle") {

    console.log("Recommended focus: Muscle Building");

} else if (goal === "Lose Weight") {

    console.log("Recommended focus: Fat Loss");

} else if (goal === "Maintain Weight") {

    console.log("Recommended focus: Weight Maintenance");

} else if (goal === "Gain Weight") {

    console.log("Recommended focus: Healthy Weight Gain");

} else {

    console.log("Please select a fitness goal.");

}