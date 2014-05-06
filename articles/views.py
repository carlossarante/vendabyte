# -*- encoding: utf-8 -*-
from django.core import serializers
from django.shortcuts import render, HttpResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Count
from articles.models import Article,Interested,Like,BrandModel,Brand,Device
from articles.serializers import serializeArticle,serializeDevices,serializeBrands,serializeBrandModels
#articles/new/ Renderiza los últimos posts usando la página articleblock.html en la variable articles, seguido del grupo a renderizar. 
#Default: /articles/new/1 
	
#Devuelve informacion sobre todos los tipos de dispositivos.
def getDevices(request,device=None):
	if device is not None:
		device = Device.objects.get(device_detail__iexact=device)
	else:
		device = Device.objects.all()
	data = serializeDevice([device],)
	return HttpResponse(data,mimetype='application/json')

#Devuelve informacion sobre todas las marcas disponibles
def getBrands(request,brand=None):
	if brand is not None:
		brand = Brand.objects.get(brand__iexact=brand)
	else:
		brand = Brand.objects.all()
	data = serializeBrands([brand],)
	return HttpResponse(data,mimetype='application/json')
#Devuelve informacion sobre todas los modelos disponibles
def getModels(request,model=None):
	if model is not None:
		model = BrandModel.objects.get(model_name__iexact=model)
	else:
		model = BrandModel.objects.all()
	data = serializeBrandModels([model],)
	return HttpResponse(data,mimetype='application/json')


#Devuelve los ultimos articulos subidos.
def getNewUploadedArticles(request,group=1):
	uploads = Article.objects.all().order_by('date_posted')
	articles = Paginator(uploads, group) 
	data = serializeArticle(articles.object_list)
	return HttpResponse(data,mimetype='application/json')
	#return render(request,'articleblock.html',{'articles':articles.object_list}) #Variable articles es la que contiene los articulos

#Devuelve los mas populares (segun cantidad de likes), no ha sido testeado.
def getMostPopularArticles(request):
	most_liked = Like.objects.all().annotate(like_count=Count('article')).order_by('-like_count')[:10]
	articles = []
	for ml in most_liked:
		articles.append(ml.article)
	data = serializeArticle(articles)
	return HttpResponse(data,mimetype='application/json')
	#return render(request,'articleblock.html',{'articles':articles})


#Devuelve los articulos más interesantes, segun cantidad de me_interesa.
def getInterestingArticles(request):
	interesting_articles = Interested.objects.filter(user=request.user)
	articles = []
	for ia in interesting_articles:
		articles.append(interesting_articles.ia)
	data = serializeArticle(articles)
	return HttpResponse(data,mimetype='application/json')
	#return render(request,'articleblock.html',{'articles':articles})

#Devuelve los archivos subidos por el usuario.
def getMyArticles(request):
	articles = Article.objects.filter(user=request.user)
	data = serializeArticle(articles)
	return HttpResponse(data,mimetype='application/json')

	#return render(request,'articleblock.html',{'articles':article})


