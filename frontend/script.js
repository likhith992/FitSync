// ==========================================
// FITSYNC - PROFILE FORM
// ==========================================


// ==========================================
// GET HTML ELEMENTS
// ==========================================

// Get the profile form
const profileForm = document.getElementById("profile-form");


// Get the input elements
const nameInput = document.getElementById("name");

const ageInput = document.getElementById("age");

const heightInput = document.getElementById("height");

const weightInput = document.getElementById("weight");

const sexInput = document.getElementById("sex");

const activityInput =
    document.getElementById("activity-level");


// Get the area where the result will be displayed
const profileResult =
    document.getElementById("profile-result");


// ==========================================
// DAILY NUTRITION ELEMENTS
// ==========================================

const calorieTargetElement =
    document.getElementById("calorie-target");

const proteinTargetElement =
    document.getElementById("protein-target");

const carbohydrateTargetElement =
    document.getElementById("carbohydrate-target");

const fatTargetElement =
    document.getElementById("fat-target");

const waterTargetElement =
    document.getElementById("water-target");



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
// BMI CALCULATION
// ==========================================

function calculateBMI(weight, height) {

    const heightInMeters = height / 100;

    const bmi =
        weight /
        (heightInMeters * heightInMeters);


    return Number(bmi.toFixed(2));
}



// ==========================================
// BMI CATEGORY
// ==========================================

function getBMICategory(bmi) {

    if (bmi < 18.5) {

        return "Underweight";

    }

    else if (bmi < 25) {

        return "Healthy Weight Range";

    }

    else if (bmi < 30) {

        return "Overweight";

    }

    else {

        return "Obesity Range";

    }

}



// ==========================================
// BMR CALCULATION
// ==========================================

function calculateBMR(weight, height, age, sex) {

    let bmr;


    if (sex === "male") {

        bmr =
            (10 * weight) +
            (6.25 * height) -
            (5 * age) +
            5;

    }

    else {

        bmr =
            (10 * weight) +
            (6.25 * height) -
            (5 * age) -
            161;

    }


    return Math.round(bmr);
}



// ==========================================
// ACTIVITY MULTIPLIER
// ==========================================

function getActivityMultiplier(activityLevel) {

    if (activityLevel === "sedentary") {

        return 1.2;

    }

    else if (activityLevel === "light") {

        return 1.375;

    }

    else if (activityLevel === "moderate") {

        return 1.55;

    }

    else if (activityLevel === "very-active") {

        return 1.725;

    }


    return 1.2;
}



// ==========================================
// MAINTENANCE CALORIES
// ==========================================

function calculateMaintenanceCalories(
    bmr,
    activityLevel
) {

    const multiplier =
        getActivityMultiplier(activityLevel);


    return Math.round(
        bmr * multiplier
    );
}


// ==========================================
// GOAL-BASED CALORIE TARGET
// ==========================================

function calculateCalorieTarget(
    maintenanceCalories,
    goal
) {

    let adjustment;


    if (goal === "Lose Weight") {

        adjustment = -300;

    }

    else if (goal === "Maintain Weight") {

        adjustment = 0;

    }

    else if (goal === "Build Muscle") {

        adjustment = 250;

    }

    else if (goal === "Gain Weight") {

        adjustment = 300;

    }

    else {

        adjustment = 0;

    }


    return maintenanceCalories + adjustment;
}


// ==========================================
// NUTRITION TARGET CALCULATION
// ==========================================

function calculateNutritionTargets(
    calorieTarget,
    proteinTarget
) {

    const proteinCalories =
        proteinTarget * 4;


    const remainingCalories =
        calorieTarget - proteinCalories;


    const carbohydrateCalories =
        remainingCalories * 0.60;


    const fatCalories =
        remainingCalories * 0.40;


    const carbohydrates =
        Math.round(
            carbohydrateCalories / 4
        );


    const fat =
        Math.round(
            fatCalories / 9
        );


    return {

        calories: calorieTarget,

        protein: proteinTarget,

        carbohydrates: carbohydrates,

        fat: fat,

        water: 3

    };

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
                "adequate protein, strength training, " +
                "and regular activity."

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
                "Focus on resistance training, " +
                "sufficient protein, adequate calories, " +
                "and proper recovery."

        };

    }


    else if (goal === "Gain Weight") {

        return {

            title: "Healthy Weight Gain",

            message:
                "Focus on a gradual calorie surplus, " +
                "nutrient-dense foods, sufficient protein, " +
                "and strength training."

        };

    }


    return {

        title: "Fitness Goal",

        message:
            "Please select a valid fitness goal."

    };

}



// ==========================================
// PROFILE FORM SUBMISSION
// ==========================================

profileForm.addEventListener(
    "submit",
    function (event) {


        // Prevent page refresh
        event.preventDefault();



        // ======================================
        // GET SELECTED FITNESS GOAL
        // ======================================

        const selectedGoal =
            document.querySelector(
                'input[name="goal"]:checked'
            );



        // ======================================
        // CHECK FITNESS GOAL
        // ======================================

        if (!selectedGoal) {

            profileResult.textContent =
                "Please select a fitness goal.";

            return;

        }



        // ======================================
        // READ FORM VALUES
        // ======================================

        const name =
            nameInput.value.trim();


        const age =
            Number(ageInput.value);


        const height =
            Number(heightInput.value);


        const weight =
            Number(weightInput.value);


        const sex =
            sexInput.value;


        const activityLevel =
            activityInput.value;


        const goal =
            selectedGoal.value;



        // ======================================
        // VALIDATION
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


        if (sex === "") {

            profileResult.textContent =
                "Please select your sex.";

            return;

        }



        // ======================================
        // CREATE USER PROFILE
        // ======================================

        const userProfile = {

            name: name,

            age: age,

            height: height,

            weight: weight,

            sex: sex,

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
        // CALCULATE BMI
        // ======================================

        const bmi =
            calculateBMI(
                userProfile.weight,
                userProfile.height
            );


        const bmiCategory =
            getBMICategory(bmi);



        // ======================================
        // CALCULATE BMR
        // ======================================

        const bmr =
            calculateBMR(
                userProfile.weight,
                userProfile.height,
                userProfile.age,
                userProfile.sex
            );



        // ======================================
        // CALCULATE MAINTENANCE CALORIES
        // ======================================

        const maintenanceCalories =
            calculateMaintenanceCalories(
                bmr,
                userProfile.activityLevel
            );



        // ======================================
        // CALCULATE GOAL-BASED CALORIE TARGET
        // ======================================
    

        const calorieTarget =
            calculateCalorieTarget(
               maintenanceCalories,
               userProfile.goal
            );



        // ======================================
        // CALCULATE NUTRITION TARGETS
        // ======================================

        const nutritionTargets =
        calculateNutritionTargets(
        calorieTarget,
        proteinTarget
            );

        // ======================================
        // CREATE FITNESS DATA OBJECT
        // ======================================

        const fitnessData = {

            bmi: bmi,

            bmiCategory: bmiCategory,

            bmr: bmr,

            maintenanceCalories:
                maintenanceCalories,

            calorieTarget:
                calorieTarget,

            nutritionTargets:
                nutritionTargets
        };



        // ======================================
        // GET GOAL INFORMATION
        // ======================================

        const goalInformation =
            getGoalMessages(
                userProfile.goal
            );



        // ======================================
        // DISPLAY PROFILE RESULT
        // ======================================

        profileResult.innerHTML = `

            <h3>FitSync Profile Created</h3>


            <p>
                Welcome,
                <strong>${userProfile.name}</strong>!
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
                <strong>Sex:</strong>
                ${userProfile.sex}
            </p>


            <p>
                <strong>BMI:</strong>
                ${fitnessData.bmi}
            </p>


            <p>
                <strong>BMI Category:</strong>
                ${fitnessData.bmiCategory}
            </p>


            <p>
                <strong>BMR:</strong>
                ${fitnessData.bmr} kcal/day
            </p>


            <p>
                <strong>
                    Estimated Maintenance Calories:
                </strong>

                ${fitnessData.maintenanceCalories}
                kcal/day
            </p>


            <p>
                <strong>
                    FitSync Calorie Target:
                </strong>

                ${fitnessData.calorieTarget}
                kcal/day
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
                <strong>
                    Estimated Protein Target:
                </strong>

                ${proteinTarget} g/day
            </p>


            <p>
                ${goalInformation.message}
            </p>

        `;



        // ======================================
        // CONSOLE OUTPUT
        // ======================================

        console.log(
            "FitSync User Profile:"
        );

        console.log(userProfile);


        console.log(
            "FitSync Fitness Data:"
        );

        console.log(fitnessData);


        console.log(
            "Estimated Protein Target:",
            proteinTarget
        );

    }
);