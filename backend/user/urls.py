from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import DetailView, LoginView, SignupView

urlpatterns = [
    path('detail/<username>', DetailView.as_view()),
    path('login', LoginView.as_view()),
    path('signup', SignupView.as_view()),
    path('refresh_token', TokenRefreshView.as_view()),
]
