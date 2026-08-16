let age = 20;
let weight = 70;
let goal = "Build Muscle";
let profileCreated = true;

if (!profileCreated) {

    console.log("Please create your FitSync profile.");

} else if (goal === "Build Muscle" && weight > 0) {

    console.log("FitSync: Generate a muscle-building plan.");

} else if (goal === "Lose Weight" && weight > 0) {

    console.log("FitSync: Generate a fat-loss plan.");

} else {

    console.log("FitSync: Please check your profile information.");

}