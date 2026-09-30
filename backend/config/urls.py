"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path

from fitness.views import (
    exercises,
    exercise_detail,
    meals,
    meal_detail,
)


urlpatterns = [
    path("admin/", admin.site.urls),

    # Workout API
    path("api/exercises/", exercises),
    path("api/exercises/<int:exercise_id>/", exercise_detail),

    # Diet API
    path("api/meals/", meals),
    path("api/meals/<int:meal_id>/", meal_detail),
]