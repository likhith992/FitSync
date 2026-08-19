// ==========================================
// FITSYNC - PROFILE FORM
// ==========================================


// Get the profile form from HTML
const profileForm = document.getElementById("profile-form");


// Get the input elements
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const activityInput = document.getElementById("activity-level");


// Get the area where we will display the result
const profileResult = document.getElementById("profile-result");


// ==========================================
// PROTEIN CALCULATION
// ==========================================

function calculateProtein(weight, goal) {

    let proteinPerKg;

    if (goal === "Build Muscle") {
        proteinPerKg = 1.8;
    } 
    else if (goal === "Lose Weight") {
        proteinPerKg = 1.6;
    } 
    else if (goal === "Gain Weight") {
        proteinPerKg = 1.6;
    } 
    else {
        proteinPerKg = 1.2;
    }

    return Math.round(weight * proteinPerKg);
}


// ==========================================
// FITNESS GOAL MESSAGES
// ==========================================

function getGoalMessages(goal) {

    if (goal === "Lose Weight") {

        return {
            title: "Fat Loss",
            message:
                "Focus on a sustainable calorie deficit, " +
                "adequate protein, strength training, and regular activity."
        };

    } 
    else if (goal === "Maintain Weight") {

        return {
            title: "Weight Maintenance",
            message:
                "Focus on maintaining a balanced diet, " +
                "regular exercise, and consistent daily habits."
        };

    } 
    else if (goal === "Build Muscle") {

        return {
            title: "Muscle Building",
            message:
                "Focus on resistance training, sufficient protein, " +
                "adequate calories, and proper recovery."
        };

    } 
    else if (goal === "Gain Weight") {

        return {
            title: "Healthy Weight Gain",
            message:
                "Focus on a gradual calorie surplus, " +
                "nutrient-dense foods, sufficient protein, and strength training."
        };

    }

    return {
        title: "Fitness Goal",
        message: "Please select a valid fitness goal."
    };
}


// ==========================================
// PROFILE FORM SUBMISSION
// ==========================================

profileForm.addEventListener("submit", function (event) {

    // Prevent the browser from refreshing the page
    event.preventDefault();


    // ======================================
    // GET FITNESS GOAL
    // ======================================

    const selectedGoal = document.querySelector(
        'input[name="goal"]:checked'
    );


    // ======================================
    // CHECK WHETHER A GOAL WAS SELECTED
    // ======================================

    if (!selectedGoal) {

        profileResult.textContent =
            "Please select a fitness goal.";

        return;
    }


    // ======================================
    // READ FORM VALUES
    // ======================================

    const name = nameInput.value.trim();

    const age = Number(ageInput.value);

    const height = Number(heightInput.value);

    const weight = Number(weightInput.value);

    const activityLevel = activityInput.value;

    const goal = selectedGoal.value;


    // ======================================
    // BASIC VALIDATION
    // ======================================

    if (name === "") {

        profileResult.textContent =
            "Please enter your name.";

        return;
    }


    if (age <= 0) {

        profileResult.textContent =
            "Please enter a valid age.";

        return;
    }


    if (height <= 0) {

        profileResult.textContent =
            "Please enter a valid height.";

        return;
    }


    if (weight <= 0) {

        profileResult.textContent =
            "Please enter a valid weight.";

        return;
    }


    // ======================================
    // CREATE USER PROFILE OBJECT
    // ======================================

    const userProfile = {

        name: name,

        age: age,

        height: height,

        weight: weight,

        goal: goal,

        activityLevel: activityLevel

    };


    // ======================================
    // CALCULATE PROTEIN
    // ======================================

    const proteinTarget =
        calculateProtein(
            userProfile.weight,
            userProfile.goal
        );


    // ======================================
    // GET GOAL INFORMATION
    // ======================================

    const goalInformation =
        getGoalMessages(userProfile.goal);


    // ======================================
    // DISPLAY PROFILE RESULT
    // ======================================

    profileResult.innerHTML = `

        <h3>FitSync Profile Created</h3>

        <p>
            Welcome, <strong>${userProfile.name}</strong>!
        </p>

        <p>
            <strong>Age:</strong>
            ${userProfile.age}
        </p>

        <p>
            <strong>Height:</strong>
            ${userProfile.height} cm
        </p>

        <p>
            <strong>Weight:</strong>
            ${userProfile.weight} kg
        </p>

        <p>
            <strong>Fitness Goal:</strong>
            ${goalInformation.title}
        </p>

        <p>
            <strong>Activity Level:</strong>
            ${userProfile.activityLevel}
        </p>

        <p>
            <strong>Estimated Protein Target:</strong>
            ${proteinTarget} g/day
        </p>

        <p>
            ${goalInformation.message}
        </p>

    `;


    // ======================================
    // SHOW PROFILE IN CONSOLE
    // ======================================

    console.log("FitSync User Profile:");

    console.log(userProfile);

    console.log("Estimated Protein Target:", proteinTarget);

});