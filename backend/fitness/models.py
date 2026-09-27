from django.db import models


class Exercise(models.Model):
    name = models.CharField(max_length=200)
    sets = models.IntegerField()
    reps = models.IntegerField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.name