from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Question, Answer
from .serializers import QuestionSerializer, AnswerSerializer

User = get_user_model()


class QuestionCreateView(APIView):
    def post(self, request):
        request.data['user'] = get_object_or_404(User, username=request.data['user']).id
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuestionListByView(APIView):
    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        questions = user.questions.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class QuestionListForView(APIView):
    def get(self, request, username):
        questions_for_user = []
        questions = Question.objects.all()
        for question in questions:
            try:
                is_answered = Answer.objects.get(question=question, user__username=username)
                serializer = AnswerSerializer(is_answered)
            except Answer.DoesNotExist:
                serializer = QuestionSerializer(question)
            questions_for_user.append(serializer.data)
        return Response(questions_for_user, status=status.HTTP_200_OK)


class AnswerCreateView(APIView):
    def post(self, request):
        request.data['user'] = get_object_or_404(User, username=request.data['user']).id
        serializer = AnswerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnswerListView(APIView):
    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        answers = user.answers.all()
        serializer = AnswerSerializer(answers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
