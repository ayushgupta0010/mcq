from django.urls import path

from . import views

urlpatterns = [
    path('question/create', views.QuestionCreateView.as_view()),
    path('question/list/by/<username>', views.QuestionListByView.as_view()),
    path('question/list/for/<username>', views.QuestionListForView.as_view()),

    path('answer/create', views.AnswerCreateView.as_view()),
    path('answer/list/<username>', views.AnswerListView.as_view()),

    path('list/question/answered/<pk>', views.QuestionAnsweredList.as_view()),
]
