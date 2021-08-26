from django.contrib.auth import get_user_model
from django.db import models

QUESTION_TYPE_LIST = [
    ('MCQ(Single Correct)', 'MCQ(Single Correct)'),
    ('MCQ(Multi Correct)', 'MCQ(Multi Correct)'),
    ('One-word', 'One-word'),
    ('True/False', 'True/False')
]

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
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question_type


class Answer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answered_by')
    answer = models.CharField(max_length=30)
    marks = models.CharField(max_length=1)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'question']

    def __str__(self):
        return f'{self.user}'
