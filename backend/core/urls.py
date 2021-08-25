from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('mcq/', include('mcq.urls')),
    path('user/', include('user.urls')),
]
