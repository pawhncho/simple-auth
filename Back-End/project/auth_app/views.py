from django.shortcuts import render
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core import signing
from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

# Create your views here.
@api_view(['GET', 'POST'])
def register(request):
	if request.method == 'POST':
		username = request.data['username']
		email = request.data['email']
		password = request.data['password']
		if User.objects.filter(username=username).exists():
			return Response(601)
		elif User.objects.filter(email=email).exists():
			return Response(602)
		else:
			user = User.objects.create_user(username=username, email=email, password=password)
			token = Token(user=user)
			token.save()
			return Response(600)

@api_view(['GET', 'POST'])
def login(request):
	if request.method == 'POST':
		username = request.data['username']
		password = request.data['password']
		user = authenticate(username=username, password=password)
		if user:
			token = Token.objects.filter(user=user).first()
			key = signing.dumps({ 'key': token.key })
			return Response(key)
		else:
			return Response(601)

@api_view(['GET', 'POST'])
def request_reset_password(request):
	if request.method == 'POST':
		email = request.data['email']
		if User.objects.filter(email=email).exists():
			user = User.objects.filter(email=email).first()
			token = signing.dumps({ 'user_id': user.id })
			send_mail(
					'Reset Password',
					f'http://192.168.1.3:3000/reset-password/{token}/',
					'Auth - Project',
					[user.email])
			return Response(600)
		else:
			return Response(601)

@api_view(['GET'])
def verify_reset_password(request, token):
	try:
		token = signing.loads(token, max_age=640)
	except:
		return Response(601)
	if token['user_id']:
		return Response(600)
	else:
		return Response(601)

@api_view(['GET', 'POST'])
def reset_password(request, token):
	if request.method == 'POST':
		new_password = request.data['password']
		try:
			token = signing.loads(token, max_age=640)
		except:
			return Response(601)
		if token['user_id']:
			if User.objects.filter(id=token['user_id']).exists():
				user = User.objects.filter(id=token['user_id']).first()
				if user.check_password(new_password):
					return Response(602)
				else:
					user.set_password(new_password)
					user.save()
					return Response(600)
			else:
				return Response(601)
		else:
			return Response(601)
