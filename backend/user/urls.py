from django.urls import path
from django.views.decorators.cache import cache_page
from rest_framework_simplejwt.views import TokenRefreshView

from .views import DetailView, LoginView, SignupView

urlpatterns = [
    path('detail/<username>', cache_page(60)(DetailView.as_view())),
    path('login', LoginView.as_view()),
    path('signup', SignupView.as_view()),
    path('refresh_token', TokenRefreshView.as_view()),
]
