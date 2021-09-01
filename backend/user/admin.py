from django.apps import apps
from django.contrib import admin

from .models import User

app = apps.get_app_config('graphql_auth')

for model_name, model in app.models.items():
    admin.site.register(model)


class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'role', 'isVerified']


admin.site.register(User, UserAdmin)
