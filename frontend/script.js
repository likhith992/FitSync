// ==========================================
// FITSYNC - PROFILE FORM
// ==========================================


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const profileForm =
    document.getElementById("profile-form");

const nameInput =
    document.getElementById("name");

const ageInput =
    document.getElementById("age");

const heightInput =
    document.getElementById("height");

const weightInput =
    document.getElementById("weight");

const sexInput =
    document.getElementById("sex");

const activityInput =
    document.getElementById("activity-level");

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
// WORKOUT ELEMENTS
// ==========================================

const workoutForm =
    document.getElementById("workout-form");

const workoutDay =
    document.getElementById("workout-day");

const workoutType =
    document.getElementById("workout-type");

const workoutResult =
    document.getElementById("workout-result");


// ==========================================
// DIET ELEMENTS
// ==========================================

const dietForm =
    document.getElementById("diet-form");

const dietGoal =
    document.getElementById("diet-goal");

const dietPreference =
    document.getElementById("diet-preference");

const dietResult =
    document.getElementById("diet-result");


// ==========================================
// CURRENT FITSYNC FITNESS DATA
// ==========================================



let currentFitnessData = null;


// ==========================================
// FITSYNC WORKOUT DATA
// ==========================================

const workoutData = {


    // ======================================
    // STRENGTH TRAINING
    // ======================================

    strength: {

        monday: [

            {
                exercise: "Bench Press",
                sets: 4,
                reps: 8,
                rest: "90 sec"
            },

            {
                exercise: "Incline Dumbbell Press",
                sets: 3,
                reps: 10,
                rest: "60 sec"
            },

            {
                exercise: "Shoulder Press",
                sets: 3,
                reps: 10,
                rest: "60 sec"
            },

            {
                exercise: "Tricep Pushdown",
                sets: 3,
                reps: 12,
                rest: "60 sec"
            }

        ],


        wednesday: [

            {
                exercise: "Barbell Squat",
                sets: 4,
                reps: 8,
                rest: "90 sec"
            },

            {
                exercise: "Romanian Deadlift",
                sets: 3,
                reps: 10,
                rest: "90 sec"
            },

            {
                exercise: "Leg Press",
                sets: 3,
                reps: 10,
                rest: "60 sec"
            },

            {
                exercise: "Calf Raises",
                sets: 3,
                reps: 15,
                rest: "45 sec"
            }

        ],


        friday: [

            {
                exercise: "Lat Pulldown",
                sets: 4,
                reps: 10,
                rest: "60 sec"
            },

            {
                exercise: "Seated Cable Row",
                sets: 3,
                reps: 10,
                rest: "60 sec"
            },

            {
                exercise: "Dumbbell Curl",
                sets: 3,
                reps: 12,
                rest: "60 sec"
            },

            {
                exercise: "Hammer Curl",
                sets: 3,
                reps: 12,
                rest: "60 sec"
            }

        ],


        // Added Tuesday workout

        tuesday: [

            {
                exercise: "Overhead Press",
                sets: 3,
                reps: 10,
                rest: "60 sec"
            },

            {
                exercise: "Dumbbell Lateral Raise",
                sets: 3,
                reps: 12,
                rest: "45 sec"
            },

            {
                exercise: "Tricep Dips",
                sets: 3,
                reps: 10,
                rest: "60 sec"
            }

        ],


        // Added Thursday workout

        thursday: [

            {
                exercise: "Goblet Squat",
                sets: 3,
                reps: 12,
                rest: "60 sec"
            },

            {
                exercise: "Walking Lunges",
                sets: 3,
                reps: 12,
                rest: "60 sec"
            },

            {
                exercise: "Calf Raises",
                sets: 3,
                reps: 15,
                rest: "45 sec"
            }

        ],


        // Added Saturday workout

        saturday: [

            {
                exercise: "Deadlift",
                sets: 3,
                reps: 6,
                rest: "120 sec"
            },

            {
                exercise: "Pull Ups",
                sets: 3,
                reps: 8,
                rest: "90 sec"
            },

            {
                exercise: "Barbell Row",
                sets: 3,
                reps: 10,
                rest: "90 sec"
            }

        ],


        // Added Sunday workout

        sunday: [

            {
                exercise: "Push Ups",
                sets: 3,
                reps: 12,
                rest: "45 sec"
            },

            {
                exercise: "Bodyweight Squats",
                sets: 3,
                reps: 15,
                rest: "45 sec"
            },

            {
                exercise: "Plank",
                sets: 3,
                reps: "30 sec",
                rest: "30 sec"
            }

        ]

    },


    // ======================================
    // CARDIO
    // ======================================

    cardio: {

        monday: [

            {
                exercise: "Brisk Walking",
                sets: 1,
                reps: "20 min",
                rest: "2 min"
            },

            {
                exercise: "Cycling",
                sets: 1,
                reps: "15 min",
                rest: "2 min"
            }

        ],


        wednesday: [

            {
                exercise: "Jogging",
                sets: 1,
                reps: "20 min",
                rest: "2 min"
            },

            {
                exercise: "Cycling",
                sets: 1,
                reps: "15 min",
                rest: "2 min"
            }

        ],


        friday: [

            {
                exercise: "Running",
                sets: 1,
                reps: "20 min",
                rest: "2 min"
            },

            {
                exercise: "Jump Rope",
                sets: 3,
                reps: "2 min",
                rest: "1 min"
            }

        ],


        // Added Tuesday workout

        tuesday: [

            {
                exercise: "Jogging",
                sets: 1,
                reps: "20 min",
                rest: "2 min"
            },

            {
                exercise: "Jump Rope",
                sets: 3,
                reps: "2 min",
                rest: "1 min"
            }

        ],


        // Added Thursday workout

        thursday: [

            {
                exercise: "Stair Climbing",
                sets: 3,
                reps: "5 min",
                rest: "2 min"
            },

            {
                exercise: "Brisk Walking",
                sets: 1,
                reps: "15 min",
                rest: "2 min"
            }

        ],


        // Added Saturday workout

        saturday: [

            {
                exercise: "Cycling",
                sets: 1,
                reps: "30 min",
                rest: "3 min"
            },

            {
                exercise: "Brisk Walking",
                sets: 1,
                reps: "20 min",
                rest: "2 min"
            }

        ],


        // Added Sunday workout

        sunday: [

            {
                exercise: "Easy Walking",
                sets: 1,
                reps: "30 min",
                rest: "3 min"
            },

            {
                exercise: "Light Cycling",
                sets: 1,
                reps: "15 min",
                rest: "3 min"
            }

        ]

    },


    // ======================================
    // HIIT
    // ======================================

    hiit: {

        tuesday: [

            {
                exercise: "Jumping Jacks",
                sets: 3,
                reps: 30,
                rest: "30 sec"
            },

            {
                exercise: "Mountain Climbers",
                sets: 3,
                reps: 20,
                rest: "30 sec"
            },

            {
                exercise: "Burpees",
                sets: 3,
                reps: 10,
                rest: "60 sec"
            },

            {
                exercise: "High Knees",
                sets: 3,
                reps: 30,
                rest: "30 sec"
            }

        ],


        thursday: [

            {
                exercise: "Burpees",
                sets: 3,
                reps: 10,
                rest: "60 sec"
            },

            {
                exercise: "High Knees",
                sets: 3,
                reps: 30,
                rest: "30 sec"
            },

            {
                exercise: "Mountain Climbers",
                sets: 3,
                reps: 20,
                rest: "30 sec"
            }

        ],


        // Added Monday workout

        monday: [

            {
                exercise: "Jumping Jacks",
                sets: 3,
                reps: 30,
                rest: "30 sec"
            },

            {
                exercise: "High Knees",
                sets: 3,
                reps: 30,
                rest: "30 sec"
            },

            {
                exercise: "Burpees",
                sets: 3,
                reps: 10,
                rest: "60 sec"
            }

        ],


        // Added Wednesday workout

        wednesday: [

            {
                exercise: "Mountain Climbers",
                sets: 3,
                reps: 20,
                rest: "30 sec"
            },

            {
                exercise: "Skater Jumps",
                sets: 3,
                reps: 20,
                rest: "45 sec"
            },

            {
                exercise: "High Knees",
                sets: 3,
                reps: 30,
                rest: "30 sec"
            }

        ],


        // Added Friday workout

        friday: [

            {
                exercise: "Jump Squats",
                sets: 3,
                reps: 15,
                rest: "45 sec"
            },

            {
                exercise: "Burpees",
                sets: 3,
                reps: 10,
                rest: "60 sec"
            },

            {
                exercise: "Mountain Climbers",
                sets: 3,
                reps: 20,
                rest: "30 sec"
            }

        ],


        // Added Saturday workout

        saturday: [

            {
                exercise: "High Knees",
                sets: 3,
                reps: 30,
                rest: "30 sec"
            },

            {
                exercise: "Jumping Jacks",
                sets: 3,
                reps: 30,
                rest: "30 sec"
            },

            {
                exercise: "Mountain Climbers",
                sets: 3,
                reps: 20,
                rest: "30 sec"
            }

        ],


        // Added Sunday workout

        sunday: [

            {
                exercise: "Low Impact High Knees",
                sets: 3,
                reps: 30,
                rest: "30 sec"
            },

            {
                exercise: "Step Jacks",
                sets: 3,
                reps: 30,
                rest: "30 sec"
            },

            {
                exercise: "Bodyweight Squats",
                sets: 3,
                reps: 15,
                rest: "45 sec"
            }

        ]

    },


    // ======================================
    // FLEXIBILITY
    // ======================================

    flexibility: {

        tuesday: [

            {
                exercise: "Hamstring Stretch",
                sets: 2,
                reps: "30 sec",
                rest: "15 sec"
            },

            {
                exercise: "Quad Stretch",
                sets: 2,
                reps: "30 sec",
                rest: "15 sec"
            },

            {
                exercise: "Shoulder Stretch",
                sets: 2,
                reps: "30 sec",
                rest: "15 sec"
            },

            {
                exercise: "Hip Flexor Stretch",
                sets: 2,
                reps: "30 sec",
                rest: "15 sec"
            }

        ],


        thursday: [

            {
                exercise: "Child's Pose",
                sets: 2,
                reps: "45 sec",
                rest: "15 sec"
            },

            {
                exercise: "Cat-Cow Stretch",
                sets: 2,
                reps: 10,
                rest: "15 sec"
            },

            {
                exercise: "Cobra Stretch",
                sets: 2,
                reps: "30 sec",
                rest: "15 sec"
            }

        ],


        // Added Monday workout

        monday: [

            {
                exercise: "Neck Stretch",
                sets: 2,
                reps: "30 sec",
                rest: "15 sec"
            },

            {
                exercise: "Shoulder Stretch",
                sets: 2,
                reps: "30 sec",
                rest: "15 sec"
            },

            {
                exercise: "Hamstring Stretch",
                sets: 2,
                reps: "30 sec",
                rest: "15 sec"
            }

        ],


        // Added Wednesday workout

        wednesday: [

            {
                exercise: "Cat-Cow Stretch",
                sets: 2,
                reps: 10,
                rest: "15 sec"
            },

            {
                exercise: "Child's Pose",
                sets: 2,
                reps: "45 sec",
                rest: "15 sec"
            },

            {
                exercise: "Cobra Stretch",
                sets: 2,
                reps: "30 sec",
                rest: "15 sec"
            }

        ],


        // Added Friday workout

        friday: [

            {
                exercise: "Chest Stretch",
                sets: 2,
                reps: "30 sec",
                rest: "15 sec"
            },

            {
                exercise: "Triceps Stretch",
                sets: 2,
                reps: "30 sec",
                rest: "15 sec"
            },

            {
                exercise: "Shoulder Stretch",
                sets: 2,
                reps: "30 sec",
                rest: "15 sec"
            }

        ],


        // Added Saturday workout

        saturday: [

            {
                exercise: "Hip Flexor Stretch",
                sets: 2,
                reps: "30 sec",
                rest: "15 sec"
            },

            {
                exercise: "Hamstring Stretch",
                sets: 2,
                reps: "30 sec",
                rest: "15 sec"
            },

            {
                exercise: "Calf Stretch",
                sets: 2,
                reps: "30 sec",
                rest: "15 sec"
            }

        ],


        // Added Sunday workout

        sunday: [

            {
                exercise: "Child's Pose",
                sets: 2,
                reps: "45 sec",
                rest: "15 sec"
            },

            {
                exercise: "Cat-Cow Stretch",
                sets: 2,
                reps: 10,
                rest: "15 sec"
            },

            {
                exercise: "Full Body Stretch",
                sets: 2,
                reps: "60 sec",
                rest: "20 sec"
            }

        ]

    }

};


// ==========================================
// FITSYNC DIET DATA
// ==========================================
//
// Structure:
//
// dietData
//     ↓
// Goal
//     ↓
// Diet Preference
//     ↓
// Meals
//
// ==========================================

const dietData = {


    // ======================================
    // LOSE WEIGHT
    // ======================================

    "Lose Weight": {


        // ==================================
        // VEGETARIAN
        // ==================================

        vegetarian: {

            title:
                "FitSync Fat Loss - Vegetarian",

            meals: [

                {
                    meal: "Breakfast",
                    food:
                        "Oats with Greek yogurt, berries and chia seeds"
                },

                {
                    meal: "Lunch",
                    food:
                        "Brown rice, dal, mixed vegetables and curd"
                },

                {
                    meal: "Snack",
                    food:
                        "Greek yogurt with fruit"
                },

                {
                    meal: "Dinner",
                    food:
                        "Paneer with vegetables and salad"
                }

            ]

        },


        // ==================================
        // NON-VEGETARIAN
        // ==================================

        "non-vegetarian": {

            title:
                "FitSync Fat Loss - Non-Vegetarian",

            meals: [

                {
                    meal: "Breakfast",
                    food:
                        "Oats with eggs and berries"
                },

                {
                    meal: "Lunch",
                    food:
                        "Grilled chicken, brown rice and vegetables"
                },

                {
                    meal: "Snack",
                    food:
                        "Greek yogurt with fruit"
                },

                {
                    meal: "Dinner",
                    food:
                        "Grilled fish with vegetables and salad"
                }

            ]

        },


        // ==================================
        // VEGAN
        // ==================================

        vegan: {

            title:
                "FitSync Fat Loss - Vegan",

            meals: [

                {
                    meal: "Breakfast",
                    food:
                        "Oats with soy milk, banana and berries"
                },

                {
                    meal: "Lunch",
                    food:
                        "Brown rice, lentils and mixed vegetables"
                },

                {
                    meal: "Snack",
                    food:
                        "Fruit with nuts"
                },

                {
                    meal: "Dinner",
                    food:
                        "Tofu with vegetables and salad"
                }

            ]

        }

    },


    // ======================================
    // MAINTAIN WEIGHT
    // ======================================

    "Maintain Weight": {


        vegetarian: {

            title:
                "FitSync Weight Maintenance - Vegetarian",

            meals: [

                {
                    meal: "Breakfast",
                    food:
                        "Oatmeal with milk, banana and nuts"
                },

                {
                    meal: "Lunch",
                    food:
                        "Rice, dal, paneer and vegetables"
                },

                {
                    meal: "Snack",
                    food:
                        "Fruit with yogurt"
                },

                {
                    meal: "Dinner",
                    food:
                        "Paneer, chapati and vegetables"
                }

            ]

        },


        "non-vegetarian": {

            title:
                "FitSync Weight Maintenance - Non-Vegetarian",

            meals: [

                {
                    meal: "Breakfast",
                    food:
                        "Oatmeal with eggs, banana and milk"
                },

                {
                    meal: "Lunch",
                    food:
                        "Chicken, rice and mixed vegetables"
                },

                {
                    meal: "Snack",
                    food:
                        "Fruit with yogurt"
                },

                {
                    meal: "Dinner",
                    food:
                        "Fish or lean chicken with rice and vegetables"
                }

            ]

        },


        vegan: {

            title:
                "FitSync Weight Maintenance - Vegan",

            meals: [

                {
                    meal: "Breakfast",
                    food:
                        "Oatmeal with soy milk, banana and nuts"
                },

                {
                    meal: "Lunch",
                    food:
                        "Rice, lentils, tofu and vegetables"
                },

                {
                    meal: "Snack",
                    food:
                        "Fruit and mixed nuts"
                },

                {
                    meal: "Dinner",
                    food:
                        "Tofu, quinoa and vegetables"
                }

            ]

        }

    },


    // ======================================
    // BUILD MUSCLE
    // ======================================

    "Build Muscle": {


        vegetarian: {

            title:
                "FitSync Muscle Building - Vegetarian",

            meals: [

                {
                    meal: "Breakfast",
                    food:
                        "Oats, eggs, banana, milk and peanut butter"
                },

                {
                    meal: "Lunch",
                    food:
                        "Rice, paneer, dal and vegetables"
                },

                {
                    meal: "Snack",
                    food:
                        "Greek yogurt, banana and nuts"
                },

                {
                    meal: "Dinner",
                    food:
                        "Paneer, chapati, curd and vegetables"
                }

            ]

        },


        "non-vegetarian": {

            title:
                "FitSync Muscle Building - Non-Vegetarian",

            meals: [

                {
                    meal: "Breakfast",
                    food:
                        "Oats, eggs, banana, milk and peanut butter"
                },

                {
                    meal: "Lunch",
                    food:
                        "Chicken, rice, vegetables and curd"
                },

                {
                    meal: "Snack",
                    food:
                        "Greek yogurt, banana and nuts"
                },

                {
                    meal: "Dinner",
                    food:
                        "Chicken or fish with rice and vegetables"
                }

            ]

        },


        vegan: {

            title:
                "FitSync Muscle Building - Vegan",

            meals: [

                {
                    meal: "Breakfast",
                    food:
                        "Oats, soy milk, banana and peanut butter"
                },

                {
                    meal: "Lunch",
                    food:
                        "Rice, tofu, lentils and vegetables"
                },

                {
                    meal: "Snack",
                    food:
                        "Soy yogurt, banana and nuts"
                },

                {
                    meal: "Dinner",
                    food:
                        "Tofu, quinoa, beans and vegetables"
                }

            ]

        }

    },


    // ======================================
    // GAIN WEIGHT
    // ======================================

    "Gain Weight": {


        vegetarian: {

            title:
                "FitSync Healthy Weight Gain - Vegetarian",

            meals: [

                {
                    meal: "Breakfast",
                    food:
                        "Oats, milk, banana, peanut butter and eggs"
                },

                {
                    meal: "Lunch",
                    food:
                        "Rice, paneer, dal, vegetables and curd"
                },

                {
                    meal: "Snack",
                    food:
                        "Banana smoothie with milk and nuts"
                },

                {
                    meal: "Dinner",
                    food:
                        "Paneer, chapati, rice and vegetables"
                }

            ]

        },


        "non-vegetarian": {

            title:
                "FitSync Healthy Weight Gain - Non-Vegetarian",

            meals: [

                {
                    meal: "Breakfast",
                    food:
                        "Oats, milk, banana, eggs and peanut butter"
                },

                {
                    meal: "Lunch",
                    food:
                        "Rice, chicken, vegetables and curd"
                },

                {
                    meal: "Snack",
                    food:
                        "Banana smoothie with milk and nuts"
                },

                {
                    meal: "Dinner",
                    food:
                        "Chicken or fish, rice and vegetables"
                }

            ]

        },


        vegan: {

            title:
                "FitSync Healthy Weight Gain - Vegan",

            meals: [

                {
                    meal: "Breakfast",
                    food:
                        "Oats, soy milk, banana and peanut butter"
                },

                {
                    meal: "Lunch",
                    food:
                        "Rice, tofu, lentils and vegetables"
                },

                {
                    meal: "Snack",
                    food:
                        "Banana smoothie with soy milk and nuts"
                },

                {
                    meal: "Dinner",
                    food:
                        "Tofu, rice, beans and vegetables"
                }

            ]

        }

    }

};


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


    return Math.round(
        weight * proteinPerKg
    );

}




// ==========================================
// BMI CALCULATION
// ==========================================

function calculateBMI(weight, height) {

    const heightInMeters =
        height / 100;


    const bmi =
        weight /
        (heightInMeters * heightInMeters);


    return Number(
        bmi.toFixed(2)
    );

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

function calculateBMR(
    weight,
    height,
    age,
    sex
) {

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

function getActivityMultiplier(
    activityLevel
) {

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
        getActivityMultiplier(
            activityLevel
        );


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


    return maintenanceCalories +
        adjustment;

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
        calorieTarget -
        proteinCalories;


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

        calories:
            calorieTarget,

        protein:
            proteinTarget,

        carbohydrates:
            carbohydrates,

        fat:
            fat,

        water:
            3

    };

}


// ==========================================
// FITNESS GOAL MESSAGES
// ==========================================

function getGoalMessages(goal) {


    if (goal === "Lose Weight") {

        return {

            title:
                "Fat Loss",

            message:
                "Focus on a sustainable calorie deficit, " +
                "adequate protein, strength training, " +
                "and regular activity."

        };

    }


    else if (goal === "Maintain Weight") {

        return {

            title:
                "Weight Maintenance",

            message:
                "Focus on maintaining a balanced diet, " +
                "regular exercise, and consistent daily habits."

        };

    }


    else if (goal === "Build Muscle") {

        return {

            title:
                "Muscle Building",

            message:
                "Focus on resistance training, " +
                "sufficient protein, adequate calories, " +
                "and proper recovery."

        };

    }


    else if (goal === "Gain Weight") {

        return {

            title:
                "Healthy Weight Gain",

            message:
                "Focus on a gradual calorie surplus, " +
                "nutrient-dense foods, sufficient protein, " +
                "and strength training."

        };

    }


    return {

        title:
            "Fitness Goal",

        message:
            "Please select a valid fitness goal."

    };

}


// ==========================================
// DISPLAY WORKOUT
// ==========================================

function displayWorkout(
    workout,
    day,
    type) 
{

    if (!workout) {

        workoutResult.innerHTML = `

            <h3>
                No Workout Available
            </h3>

            <p>
                FitSync does not currently have
                a ${type} workout for ${day}.
            </p>

        `;

        return;

    }


    let workoutHTML = `

        <h3>
            FitSync Workout
        </h3>


        <p>

            <strong>
                Day:
            </strong>

            ${day}

        </p>


        <p>

            <strong>
                Workout Type:
            </strong>

            ${type}

        </p>


        <table>

            <thead>

                <tr>

                    <th>
                        Exercise
                    </th>

                    <th>
                        Sets
                    </th>

                    <th>
                        Reps / Duration
                    </th>

                    <th>
                        Rest
                    </th>

                </tr>

            </thead>


            <tbody>

    `;


    workout.forEach(
        function (exercise) {

            workoutHTML += `

                <tr>

                    <td>
                        ${exercise.exercise}
                    </td>

                    <td>
                        ${exercise.sets}
                    </td>

                    <td>
                        ${exercise.reps}
                    </td>

                    <td>
                        ${exercise.rest}
                    </td>

                </tr>

            `;

        }
    );


    workoutHTML += `

            </tbody>

        </table>

    `;


    workoutResult.innerHTML =
        workoutHTML;

}


// ==========================================
// DISPLAY DIET
// ==========================================

function displayDiet(
    diet,
    calorieTarget,
    proteinTarget)
{

    if (!diet) {

        dietResult.innerHTML = `

            <h3>
                No Diet Recommendation Available
            </h3>

            <p>
                FitSync could not find a diet
                recommendation for the selected
                combination.
            </p>

        `;

        return;

    }


    let dietHTML = `

        <h3>
            ${diet.title}
        </h3>


        <p>

            <strong>
                Daily Calorie Target:
            </strong>

            ${calorieTarget}
            kcal

        </p>


        <p>

            <strong>
                Daily Protein Target:
            </strong>

            ${proteinTarget}
            g

        </p>


        <table>

            <thead>

                <tr>

                    <th>
                        Meal
                    </th>

                    <th>
                        Recommendation
                    </th>

                </tr>

            </thead>


            <tbody>

    `;


    diet.meals.forEach(
        function (meal) {

            dietHTML += `

                <tr>

                    <td>
                        ${meal.meal}
                    </td>

                    <td>
                        ${meal.food}
                    </td>

                </tr>

            `;

        }
    );


    dietHTML += `

            </tbody>

        </table>

    `;


    dietResult.innerHTML =
        dietHTML;

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
        // GET FITNESS GOAL
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

            name:
                name,

            age:
                age,

            height:
                height,

            weight:
                weight,

            sex:
                sex,

            goal:
                goal,

            activityLevel:
                activityLevel

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
        // CALCULATE CALORIE TARGET
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

            bmi:
                bmi,

            bmiCategory:
                bmiCategory,

            bmr:
                bmr,

            maintenanceCalories:
                maintenanceCalories,

            calorieTarget:
                calorieTarget,

            nutritionTargets:
                nutritionTargets

        };


        // ======================================
        // SAVE CURRENT FITNESS DATA
        // ======================================
        //
        // This is the new 4.10.7 connection.
        //
        // The Diet Planner will use this object
        // instead of reading values back from HTML.
        //
        // ======================================

        currentFitnessData =
            fitnessData;


        // ======================================
        // UPDATE DAILY NUTRITION
        // ======================================

        calorieTargetElement.textContent =
            nutritionTargets.calories +
            " kcal";


        proteinTargetElement.textContent =
            nutritionTargets.protein +
            " g";


        carbohydrateTargetElement.textContent =
            nutritionTargets.carbohydrates +
            " g";


        fatTargetElement.textContent =
            nutritionTargets.fat +
            " g";


        waterTargetElement.textContent =
            nutritionTargets.water +
            " litres";


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

            <h3>
                FitSync Profile Created
            </h3>


            <p>

                Welcome,

                <strong>
                    ${userProfile.name}
                </strong>!

            </p>


            <p>

                <strong>
                    Age:
                </strong>

                ${userProfile.age}

            </p>


            <p>

                <strong>
                    Height:
                </strong>

                ${userProfile.height}
                cm

            </p>


            <p>
                <stro
                ng>
                    Weight:
                </strong>

                ${userProfile.weight}
                kg

            </p>


            <p>

                <strong>
                    Sex:
                </strong>

                ${userProfile.sex}

            </p>


            <p>

                <strong>
                    BMI:
                </strong>

                ${fitnessData.bmi}

            </p>


            <p>

                <strong>
                    BMI Category:
                </strong>

                ${fitnessData.bmiCategory}

            </p>


            <p>

                <strong>
                    BMR:
                </strong>

                ${fitnessData.bmr}
                kcal/day

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

                <strong>
                    Fitness Goal:
                </strong>

                ${goalInformation.title}

            </p>


            <p>

                <strong>
                    Activity Level:
                </strong>

                ${userProfile.activityLevel}

            </p>


            <p>

                <strong>
                    Estimated Protein Target:
                </strong>

                ${proteinTarget}
                g/day

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

        console.log(
            userProfile
        );


        console.log(
            "FitSync Fitness Data:"
        );

        console.log(
            fitnessData
        );


        console.log(
            "Estimated Protein Target:",
            proteinTarget
        );

    }

);


// ==========================================
// WORKOUT FORM SUBMISSION
// ==========================================

workoutForm.addEventListener(
    "submit",
    function (event) {
 
         // Prevent page refresh
        event.preventDefault();


        // ======================================
        // GET SELECTED DAY
        // ======================================

        const selectedDay =
            workoutDay.value;


        // ======================================
        // GET SELECTED WORKOUT TYPE
        // ======================================

        const selectedType =
            workoutType.value;


        // ======================================
        // FIND WORKOUT
        // ======================================

        const selectedWorkout =
            workoutData[selectedType]?.[selectedDay];


        // ======================================
        // DISPLAY WORKOUT
        // ======================================

        displayWorkout(
            selectedWorkout,
            selectedDay,
            selectedType
        );

    }

);


// ==========================================
// DIET FORM SUBMISSION
// ==========================================
//
// NEW IN MODULE 4.10.7
//
// ==========================================

dietForm.addEventListener(
    "submit",
     function (event) {

         // Prevent page refresh
        event.preventDefault();


        // ======================================
        // CHECK WHETHER PROFILE EXISTS
        // ======================================

        if (!currentFitnessData) {

            dietResult.innerHTML = `

                <h3>
                    Create Your FitSync Profile First
                </h3>

                <p>
                    Please create your FitSync
                    profile before requesting
                    a personalized diet.
                </p>

            `;

            return;

        }


        // ======================================
        // GET SELECTED GOAL
        // ======================================

        const selectedGoal =
            dietGoal.value;


        // ======================================
        // GET DIET PREFERENCE
        // ======================================

        const selectedPreference =
            dietPreference.value;


        // ======================================
        // FIND DIET FOR GOAL
        // ======================================

        const goalDiet =
            dietData[selectedGoal];


        // ======================================
        // FIND DIET FOR PREFERENCE
        // ======================================

        const selectedDiet =
            goalDiet?.[selectedPreference];


        // ======================================
        // GET CALORIE TARGET
        // ======================================

        const calorieTarget =
            currentFitnessData.calorieTarget;


        // ======================================
        // GET PROTEIN TARGET
        // ======================================

        const proteinTarget =
            currentFitnessData
                .nutritionTargets
                .protein;


        // ======================================
        // DISPLAY DIET
        // ======================================

        displayDiet(
            selectedDiet,
            calorieTarget,
            proteinTarget
        );

    }

);