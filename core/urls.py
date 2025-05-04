from django.urls import path
from . import views

app_name = 'core'
urlpatterns = [
    path('', views.Home.as_view(), name='home'),
    path('notification', views.Notification.as_view(), name='notification'),
    path('messages', views.Messages.as_view(), name='messages'),
]