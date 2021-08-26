from django.contrib.auth.models import AbstractUser
from django.db import models

ROLE_LIST = [
    ('student', 'student'),
    ('teacher', 'teacher')
]


class User(AbstractUser):
    role = models.CharField(max_length=7, choices=ROLE_LIST, blank=True, null=True)
    is_verified = models.BooleanField()
