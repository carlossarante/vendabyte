# -*- encoding: utf-8 -*-
from rest_framework import viewsets
from django.contrib.auth import authenticate, login
from django.shortcuts import render, HttpResponseRedirect,HttpResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Count
from .models import User
#articles/new/ Renderiza los últimos posts usando la página articleblock.html en la variable articles, seguido del grupo a renderizar. 
#Default: /articles/new/1 

def getCurrentUserArticles(request):
	user = request.user
	articles = user.article_set.all()
	return render(request,'user.html', {'articles':articles})


def loginUser(request):
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



def getUser(request):
	pass

def getSession(request):
	pass



