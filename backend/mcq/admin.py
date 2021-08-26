from django.contrib import admin

from .models import Question, Answer


class QuestionAdmin(admin.ModelAdmin):
    list_display = ['user', 'question_type', 'timestamp']


class AnswerAdmin(admin.ModelAdmin):
    list_display = ['user', 'answer', 'marks']


admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer, AnswerAdmin)
