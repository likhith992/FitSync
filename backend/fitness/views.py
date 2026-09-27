from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Exercise
import json


@csrf_exempt
def exercises(request):

    # GET - get all exercises
    if request.method == "GET":
        exercise_list = list(
            Exercise.objects.all().values(
                "id",
                "name",
                "sets",
                "reps",
                "completed",
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
            )

            return JsonResponse(
                {
                    "id": exercise.id,
                    "name": exercise.name,
                    "sets": exercise.sets,
                    "reps": exercise.reps,
                    "completed": exercise.completed,
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

            exercise.save()

            return JsonResponse(
                {
                    "id": exercise.id,
                    "name": exercise.name,
                    "sets": exercise.sets,
                    "reps": exercise.reps,
                    "completed": exercise.completed,
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

            exercise.save()

            return JsonResponse(
                {
                    "id": exercise.id,
                    "name": exercise.name,
                    "sets": exercise.sets,
                    "reps": exercise.reps,
                    "completed": exercise.completed,
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