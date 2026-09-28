from django.db import models


class Exercise(models.Model):
    name = models.CharField(max_length=200)
    sets = models.IntegerField()
    reps = models.IntegerField()
    completed = models.BooleanField(default=False)
    day = models.CharField(max_length=20, default="Monday")

    def __str__(self):
        return self.name


class Meal(models.Model):
    name = models.CharField(max_length=200)
    meal_type = models.CharField(max_length=50)
    calories = models.IntegerField()

    def __str__(self):
        return self.name
