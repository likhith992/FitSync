from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Exercise, Meal
import json
from datetime import date


@csrf_exempt
def exercises(request):

    # GET - get all exercises
    if request.method == "GET":
        day = request.GET.get("day")

        if day:
            exercises = Exercise.objects.filter(day=day)
        else:
            exercises = Exercise.objects.all()

        exercise_list = list(
            exercises.values(
                "id",
                "name",
                "sets",
                "reps",
                "completed",
                "day",
            )
        )

        return JsonResponse(exercise_list, safe=False)

    # POST - add exercise
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            exercise = Exercise.objects.create(
                name=data.get("name", "New Exercise"),
                sets=int(data.get("sets", 3)),
                reps=int(data.get("reps", 10)),
                completed=False,
                day=data.get("day", "Monday"),
            )

            return JsonResponse(
                {
                    "id": exercise.id,
                    "name": exercise.name,
                    "sets": exercise.sets,
                    "reps": exercise.reps,
                    "completed": exercise.completed,
                    "day": exercise.day,
                },
                status=201,
            )

        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400,
            )

    # PUT - update exercise
    if request.method == "PUT":
        try:
            data = json.loads(request.body)

            exercise_id = data.get("id")

            if not exercise_id:
                return JsonResponse(
                    {"error": "Exercise ID is required"},
                    status=400,
                )

            exercise = Exercise.objects.get(id=exercise_id)

            if "name" in data:
                exercise.name = data["name"]

            if "sets" in data:
                exercise.sets = int(data["sets"])

            if "reps" in data:
                exercise.reps = int(data["reps"])

            if "completed" in data:
                exercise.completed = data["completed"]

            if "day" in data:
                exercise.day = data["day"]

            exercise.save()

            return JsonResponse(
                {
                    "id": exercise.id,
                    "name": exercise.name,
                    "sets": exercise.sets,
                    "reps": exercise.reps,
                    "completed": exercise.completed,
                    "day": exercise.day,
                }
            )

        except Exercise.DoesNotExist:
            return JsonResponse(
                {"error": "Exercise not found"},
                status=404,
            )

        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400,
            )

    # DELETE - delete exercise
    if request.method == "DELETE":
        try:
            data = json.loads(request.body)

            exercise_id = data.get("id")

            if not exercise_id:
                return JsonResponse(
                    {"error": "Exercise ID is required"},
                    status=400,
                )

            exercise = Exercise.objects.get(id=exercise_id)
            exercise.delete()

            return JsonResponse(
                {"message": "Exercise deleted successfully"}
            )

        except Exercise.DoesNotExist:
            return JsonResponse(
                {"error": "Exercise not found"},
                status=404,
            )

        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400,
            )

    return JsonResponse(
        {"error": "Method not allowed"},
        status=405,
    )


@csrf_exempt
def exercise_detail(request, exercise_id):

    try:
        exercise = Exercise.objects.get(id=exercise_id)

    except Exercise.DoesNotExist:
        return JsonResponse(
            {"error": "Exercise not found"},
            status=404,
        )

    # PUT - update one exercise
    if request.method == "PUT":
        try:
            data = json.loads(request.body)

            if "name" in data:
                exercise.name = data["name"]

            if "sets" in data:
                exercise.sets = int(data["sets"])

            if "reps" in data:
                exercise.reps = int(data["reps"])

            if "completed" in data:
                exercise.completed = data["completed"]

            if "day" in data:
                exercise.day = data["day"]

            exercise.save()

            return JsonResponse(
                {
                    "id": exercise.id,
                    "name": exercise.name,
                    "sets": exercise.sets,
                    "reps": exercise.reps,
                    "completed": exercise.completed,
                    "day": exercise.day,
                }
            )

        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400,
            )

    # DELETE - delete one exercise
    if request.method == "DELETE":
        exercise.delete()

        return JsonResponse(
            {"message": "Exercise deleted successfully"}
        )

    return JsonResponse(
        {"error": "Method not allowed"},
        status=405,
    )



@csrf_exempt
def meals(request):

    # GET - get all meals, including their dates
    if request.method == "GET":
        meal_list = list(
            Meal.objects.all().values(
                "id",
                "name",
                "meal_type",
                "calories",
                "date",
            )
        )

        return JsonResponse(meal_list, safe=False)

    # POST - add a meal with a date
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            meal_date = data.get("date") or date.today().isoformat()

            meal = Meal.objects.create(
                name=data.get("name", "New Meal"),
                meal_type=data.get("meal_type", "Snack"),
                calories=int(data.get("calories", 0)),
                date=meal_date,
            )

            return JsonResponse(
                {
                    "id": meal.id,
                    "name": meal.name,
                    "meal_type": meal.meal_type,
                    "calories": meal.calories,
                    "date": meal.date,
                },
                status=201,
            )

        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400,
            )

    return JsonResponse(
        {"error": "Method not allowed"},
        status=405,
    )


@csrf_exempt
def meal_detail(request, meal_id):

    try:
        meal = Meal.objects.get(id=meal_id)

    except Meal.DoesNotExist:
        return JsonResponse(
            {"error": "Meal not found"},
            status=404,
        )

    # PUT - update one meal
    if request.method == "PUT":
        try:
            data = json.loads(request.body)

            if "name" in data:
                meal.name = data["name"]

            if "meal_type" in data:
                meal.meal_type = data["meal_type"]

            if "calories" in data:
                meal.calories = int(data["calories"])

            if "date" in data:
                meal.date = data["date"]

            meal.save()

            return JsonResponse(
                {
                    "id": meal.id,
                    "name": meal.name,
                    "meal_type": meal.meal_type,
                    "calories": meal.calories,
                    "date": meal.date,
                }
            )

        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400,
            )

    # DELETE - delete one meal
    if request.method == "DELETE":
        meal.delete()

        return JsonResponse(
            {"message": "Meal deleted successfully"}
        )

    return JsonResponse(
        {"error": "Method not allowed"},
        status=405,
    )
