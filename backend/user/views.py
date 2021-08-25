from django.contrib.auth import get_user_model
from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import LoginSerializer, UserSerializer

User = get_user_model()


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


class SignupView(CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = User.objects.all()
    serializer_class = UserSerializer
