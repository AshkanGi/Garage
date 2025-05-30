from django.shortcuts import render
from django.views import View


class Home(View):
    def get(self, request):
        return render(request, 'core/index.html')


class Notification(View):
    def get(self, request):
        return render(request, 'core/notification.html')


class Messages(View):
    def get(self, request):
        return render(request, 'core/messages.html')
