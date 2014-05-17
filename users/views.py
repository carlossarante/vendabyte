# -*- encoding: utf-8 -*-
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, HttpResponseRedirect,HttpResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.conf import settings
from django.db.models import Count
from geographics.views import getCity
from articles.serializers import ArticleSerializer
#from articles.serializers import serializeArticle
from .models import User
from .serializers import serializeUser,serializeFollowers


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
		u.photo = getPicture(request['photo']) #photo sería la URL que apunta a su foto de facebook.
		u.cover = getPicture(request.POST['cover']) #cover sería la url del cover.
		u.save() #Finalmente, logueamos el usuario.
		return loginUser(request,'html') #Si todo sale bien, entonces redirige a la página del usuario creado, usando loginUser()
	except ValueError:	 #Retorna el error.
		return HttpResponse('Error creating the user')

def loginUser(request,response='html'):
	username = request.POST['username']
	facebook_uid = request.POST['facebook_uid']
	user = authenticate(username=username,facebook_uid=facebook_uid)
	if user is not None:
		if user.is_active:
			login(request,user)
			HttpResponseRedirect('/users/%s' % user.username)
		else:
			return HttpResponse('User is not active')
	else:
		try: 
			User.objects.get(username=username)
			return HttpResponse('Wrong Password')
		except User.DoesNotExist:
			return HttpResponse('User Does not Exist')	


#Retorna el usuario que está authenticado.
@login_required #Necesita login para realizarse, sino dará una respuesta de redirección a la página principal para loguearse. 
def getCurrentUser(request,response='html'):
	user = request.user
	if not (response == 'json'):
		return render(request,'user.html', {'user':request.user})
	else:
		data = serializeUser([user,])
		return HttpResponse(data,mimetype='application/json')


@login_required
def getCurrentUserArticles(request,response='html'):
	user = request.user
	articles = user.article_set.all()
	if not (response == 'json'):
		return render(request,'user.html', {'articles':articles})
	else:
		data = ArticleSerializer(articles)
		return HttpResponse([data.data],mimetype='application/json')

@login_required
def getCurrentUserFollows(request,response='html'):
	following = request.user.follows.all()
	if not (response == 'json'):
		return render(request,'user.html', {'following':following,'user':request.user}) #list.html seria el template que lista los usuarios.
	else:
		data = serializeFollowers(following)
		return HttpResponse(data,mimetype='application/json')

@login_required
def getCurrentUserFollowers(request,response='html'):
	followers = User.objects.filter(follows=request.user)
	if not (response == 'json'):
		return render(request,'user.html', {'followers':followers,'user':request.user}) #list.html seria el template que lista los usuarios.
	else:
		data = serializeFollowers(followers)
		return HttpResponse(data,mimetype='application/json')