# -*- encoding: utf-8 -*-
from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Count
from articles.models import Article,Interested,Like

#articles/new/ Renderiza los últimos posts usando la página articleblock.html en la variable articles, seguido del grupo a renderizar. 
#Default: /articles/new/1 

def getNewUploadedArticles(request,group=1):
	uploads = Article.objects.all().order_by('date_posted')
	articles = Paginator(articles, group) 
	return render(request,'articleblock.html',{'articles':articles.object_list}) #Variable articles es la que contiene los articulos

def getMostPopularArticles(request):
	most_liked = Like.objects.all().annotate(like_count=Count('article')).order_by('-like_count')[:10]
	articles = []
	for ml in most_liked:
		articles.append(ml.article)
	return render(request,'articleblock.html',{'articles':articles})

def getInterestingArticles(request):
	interesting_articles = Interested.objects.filter(user=request.user)
	articles = []
	for ia in interesting_articles:
		articles.append(interesting_articles.ia)
	return render(request,'articleblock.html',{'articles':articles})

def getMyArticles(request):
	articles = Article.objects.get(user=request.user)
	return render(request,'articleblock.html',{'articles':article})


