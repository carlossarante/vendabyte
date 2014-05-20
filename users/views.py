# -*- encoding: utf-8 -*-
from django.shortcuts import render, HttpResponseRedirect,HttpResponse,get_object_or_404
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.db.models import Count

from rest_framework.response import Response
from rest_framework.decorators import api_view

from geographics.views import getCity

from articles.serializers import ArticleSerializer

from users.models import User
from users.serializers import UserSerializer

def getUserIndex(request):
	return render(request,'user.html')

def userRenderizer(request,data):
	if request.accepted_renderer.format == 'json':
		serialized = UserSerializer(data)
		return Response(serialized.data)
	else:  
		return render(request,'user.html',{'users':data})

#Registra usuario mediante facebook. Funciona enviando un JSON a /users/create/ siguiendo los parametros especificados.

def registerUser(request):
	try:
		u = User.create_user(
			username = request.POST['username'],  #Usuario creado, idealmente el que usa facebook.
			first_name = request.POST['first_name'], #Primer nombre.
			last_name = request.POST['last_name'], #Apellidos.
			email = request.POST['email'], #Email que usa para login en facebook.
			birthday = request.POST['birthday'], #Cumpleaños, este campo debe ser YYYY-MM-DD sino dará error. 
			city = getCity(request.POST['city_name'],request.POST['province']) #Pasar ciudad y provincia.
			)
		u.facebook_uid = request.POST['facebook_uid'] #El id de facebook se le asigna al usuario, esto es para el login.
		u.set_password('%s%s%s' % (u.id,u.facebook_uid,settings.SALT)) #La clave se crea con SALT, el id de facebook y el id creado.
		#u.photo = getPicture(request['photo']) #photo sería la URL que apunta a su foto de facebook.
		#u.cover = getPicture(request.POST['cover']) #cover sería la url del cover.
		u.save() #Finalmente, logueamos el usuario.
		return loginUser(request,'html') #Si todo sale bien, entonces redirige a la página del usuario creado, usando loginUser()
	except ValueError:	 #Retorna el error.
		return HttpResponse('Error creating the user')

def authenticateInsecure(fbid):
	try:
		user = User.objects.get(facebook_uid=fbid)
		return user
	except User.DoesNotExist:
		return None

@csrf_exempt
def loginUser(request,response='html'):
	#username = request.POST['username']
	facebook_uid = request.POST['facebook_uid']
	user = authenticateInsecure(facebook_uid)
	if user is not None:
		if user.is_active:
			login(request,user)
			return HttpResponseRedirect('/users/%s' % user.username)
		else:
			return HttpResponse('User is not active')
	else:
		try: 
			#User.objects.get(username=username)
			return HttpResponse('Wrong Password')
		except User.DoesNotExist:
			return HttpResponse('User Does not Exist')	


#Retorna el usuario que está authenticado.
#@login_required #Necesita login para realizarse, sino dará una respuesta de redirección a la página principal para loguearse. 
@api_view(['GET'])
@login_required
def getCurrentUserFollows(request):
	following = User.objects.filter(follows=request.user)
	return userRenderizer(request,following)
@api_view(['GET'])
@login_required
def getCurrentUserFollowers(request):
	followers = request.user.follows.all()
	return userRenderizer(request,followers)

@api_view(['GET','POST','DELETE','PUT'])
def userManager(request,pk=None,username=None):
	if username is not None:
		user = get_object_or_404(User,username=username)
	elif pk is not None:
		user=get_object_or_404(User,id=pk)
	else:
		user = request.User
	
	if request.method == 'POST':
		user = UserSerializer(data=request.DATA)
		if comment.is_valid():
			comment.save()
			return Response(comment.data,status=status.HTTP_201_CREATED)	
		return Response(article_uploaded.errors,status=status.HTTP_400_BAD_REQUEST)
	
	elif request.method == 'GET':
		return userRenderizer(request,user)
	
	elif request.method == 'DELETE':
		return Response(status=status.HTTP_204_NO_CONTENT)
	
	elif request.method == 'PUT':
		updated_user = UserSerializer(user,data=request.DATA)
		if updated_user.is_valid():
			updated_user.save()
			return Response(comment.data,status=status.HTTP_201_CREATED)	
		return Response(article_uploaded.errors,status=status.HTTP_400_BAD_REQUEST)


