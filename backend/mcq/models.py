from django.contrib.auth import get_user_model
from django.db import models

from utilities.question_type_list import QUESTION_TYPE_LIST
from utilities.subject_list import SUBJECT_LIST

User = get_user_model()


class Question(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='questions')
    question_type = models.CharField(max_length=19, choices=QUESTION_TYPE_LIST)
    question = models.TextField()
    mcqOptionA = models.CharField(max_length=100, blank=True, default='')
    mcqOptionB = models.CharField(max_length=100, blank=True, default='')
    mcqOptionC = models.CharField(max_length=100, blank=True, default='')
    mcqOptionD = models.CharField(max_length=100, blank=True, default='')
    correct_answer = models.CharField(max_length=100)
    cls = models.CharField(max_length=2, verbose_name='class')
    subject = models.CharField(max_length=18, choices=SUBJECT_LIST)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question_type


class Answer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.CharField(max_length=30)
    marks = models.CharField(max_length=1)

    class Meta:
        unique_together = ['user', 'question']

    def __str__(self):
        return f'{self.user}'
