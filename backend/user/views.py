from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import permissions, status
from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
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


class VerifyView(APIView):
    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        user.isVerified = True
        user.save()
        return Response('Verified', status=status.HTTP_200_OK)


class UnverifiedListView(ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.filter(isVerified=False)
