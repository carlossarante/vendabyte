# -*- encoding: utf-8 -*-
from rest_framework import viewsets
from django.contrib.auth import authenticate, login
from django.shortcuts import render, HttpResponseRedirect,HttpResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Count
from .models import User
from .serializers import serializeUser,serializeFollowers
from articles.serializers import serializeArticle
#articles/new/ Renderiza los últimos posts usando la página articleblock.html en la variable articles, seguido del grupo a renderizar. 
#Default: /articles/new/1 


def loginUser(request,response='html'):
	username = request.POST['username']
	facebook_uid = request.POST['user_id']
	user = authenticate(username=username,facebook_uid=facebook_uid)
	if user is not None:
		if user.is_active:
			login(request,user)
			HttpResponseRedirect('/users/%s' % user.username)
		else:
			return HttpResponse('User is not active')
	else:
		return HttpResponse('Wrong PASSWORD')



def getCurrentUserArticles(request,response='html'):
	user = request.user
	articles = user.article_set.all()
	if not (response == 'json'):
		return render(request,'user.html', {'articles':articles,'user':request.user})
	else:
		data = serializeArticle(articles)
		return HttpResponse(data,mimetype='application/json')


def getCurrentUserFollows(request,response='html'):
	following = request.user.follows.all()
	if not (response == 'json'):
		return render(request,'user.html', {'following':following,'user':request.user}) #list.html seria el template que lista los usuarios.
	else:
		data = serializeFollowers(following)
		return HttpResponse(data,mimetype='application/json')


def getCurrentUserFollowers(request,response='html'):
	followers = User.objects.filter(follows=request.user)
	if not (response == 'json'):
		return render(request,'user.html', {'followers':followers,'user':request.user}) #list.html seria el template que lista los usuarios.
	else:
		data = serializeFollowers(followers)
		return HttpResponse(data,mimetype='application/json')