from django.urls import path
from django.views.decorators.cache import cache_page

from . import views

urlpatterns = [
    path('question/create', views.QuestionCreateView.as_view()),
    path('question/list/by/<username>', cache_page(60)(views.QuestionListByView.as_view())),
    path('question/list/for/<username>', cache_page(60)(views.QuestionListForView.as_view())),

    path('answer/create', views.AnswerCreateView.as_view()),
    path('answer/list/<username>', cache_page(60)(views.AnswerListView.as_view())),

    path('list/question/answered/<pk>', cache_page(60)(views.QuestionAnsweredList.as_view())),
]
