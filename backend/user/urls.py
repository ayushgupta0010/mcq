from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import LoginView, SignupView

urlpatterns = [
    path('login', LoginView.as_view()),
    path('signup', SignupView.as_view()),
    path('refresh_token', TokenRefreshView.as_view()),
]
