from django.urls import path
from . import views

# Create your views here.
urlpatterns = [
	path('register/', views.register),
	path('login/', views.login),
	path('forgot-password/', views.request_reset_password),
	path('verify-reset-password/<token>/', views.verify_reset_password),
	path('reset-password/<token>/', views.reset_password),
]
