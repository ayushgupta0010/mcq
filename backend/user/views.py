from django.contrib.auth import get_user_model
from rest_framework import permissions
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import LoginSerializer, UserSerializer

User = get_user_model()


class DetailView(RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'username'


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


class SignupView(CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = User.objects.all()
    serializer_class = UserSerializer
