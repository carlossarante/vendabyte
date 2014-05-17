# -*- encoding: utf-8 -*-
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
	
from django.shortcuts import render, HttpResponse,HttpResponseRedirect,get_object_or_404
from django.http import StreamingHttpResponse
from django.db.models import Count
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.decorators import login_required

from articles.forms import ArticleForm
from articles.models import Article,ArticlePicture,Interested,Like,BrandModel,Brand,Device
from articles.serializers import ArticleSerializer, BrandModelSerializer,BrandSerializer,DeviceSerializer,ArticlePictureSerializer,LikeSerializer,CommentSerializer,InterestingSerializer

#articles/new/ Renderiza los últimos posts usando la página articleblock.html en la variable articles, seguido del grupo a renderizar. 
#Default: /articles/new/1 

#Recibe data y request; renderiza si se pide formato json.


def articleRenderizer(request,data):
	if request.accepted_renderer.format == 'json':
		serialized = ArticleSerializer(data)
		return Response(serialized.data)
	else:  
		return render(request,'articleblock.html',{'articles':data})

def uploadArticleForm(request):
	form = ArticleForm()
	return render (request,'articleform.html',{'form':form})


#Creacion, edicion, consulta y eliminacion de articulos.
@api_view(['GET','POST','PUT','DELETE'])
@login_required
def articleDetail(request,pk=None):
	article = get_object_or_404(Article,id=pk)
	if request.method == 'DELETE':
		article.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
	if request.method == 'GET':
		return articleRenderizer(request,article)
	elif request.method == 'POST':
		article_uploaded = ArticleSerializer(data=request.DATA)
		if article_uploaded.is_valid():
			article_uploaded.save()
			return Response(article_uploaded.data,status=status.HTTP_201_CREATED)
		return Response(article_uploaded.errors,status=status.HTTP_400_BAD_REQUEST)
	elif request.method == 'PUT':
		article_uploaded = ArticleSerializer(Article, data=request.DATA)
        if article_uploaded.is_valid():
            article_uploaded.save()
            return Response(article_uploaded.data)
        return Response(article_uploaded.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST','GET'])
@login_required
def articlePictureManager(request,pk):
	article = Article.objects.get(id=pk)
	if request.method == 'POST':
		article_uploaded = ArticleSerializer(data=request.DATA)
		if article_uploaded.is_valid():
			article_uploaded.save()
			return Response(article_uploaded.data,status=status.HTTP_201_CREATED)	
		return Response(article_uploaded.errors,status=status.HTTP_400_BAD_REQUEST)
	elif request.method == 'GET':
		article_pictures = article.articlepicture_set.all()
		return Response(article_pictures.data)

@api_view(['POST','GET'])
@login_required
def LikeManager(request,pk):
	article = Article.objects.get(id=pk)
	if request.method == 'POST':
		like = LikeSerializer(data=request.DATA)
		if like.is_valid():
			like.save()
			return Response(like.data,status=status.HTTP_201_CREATED)	
		return Response(like.errors,status=status.HTTP_400_BAD_REQUEST)
	elif request.method == 'GET':
		likes = article.like_set.all()
		article_likes = LikeSerializer(likes)
		return Response(article_likes.data)


@api_view(['POST','GET'])
@login_required
def CommentManager(request,pk):
	article = Article.objects.get(id=pk)
	if request.method == 'POST':
		comment = CommentSerializer(data=request.DATA)
		if comment.is_valid():
			comment.save()
			return Response(comment.data,status=status.HTTP_201_CREATED)	
		return Response(comment.errors,status=status.HTTP_400_BAD_REQUEST)
	elif request.method == 'GET':
		comments = article.comment_set.all()
		article_comments = CommentSerializer(comments)
		return Response(article_comments.data)

@api_view(['POST','GET'])
@login_required
def InterestingManager(request,pk):
	article = Article.objects.get(id=pk)
	if request.method == 'POST':
		interested = InterestedSerializer(data=request.DATA)
		if article_uploaded.is_valid():
			article_uploaded.save()
			return Response(article_uploaded.data,status=status.HTTP_201_CREATED)	
		return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
	elif request.method == 'GET':
		interesting_articles = article.interested_set.all()
		article_interested = InterestingSerializer(interesting_articles)
		return Response(article_interested.data)



@api_view(['GET'])
@login_required
def articlePictureManager(request,pk):
	article = Article.objects.get(id=pk)
	if request.method == 'POST':
		article_uploaded = LikeSerializer(data=request.DATA)
		if article_uploaded.is_valid():
			article_uploaded.save()
			return Response(article_uploaded.data,status=status.HTTP_201_CREATED)	
		return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
	elif request.method == 'GET':
		article_pictures = article.articlepicture_set.all()
		return Response(article_pictures.data)


#Trabaja con listas.
@api_view(['GET'])
@login_required
def articleList(request,group=1):
	articles = Article.objects.all().order_by('-date_posted')
	article_list = Paginator(articles,10)
	articles = article_list.page(group).object_list
	if request.method == 'GET':
		if request.accepted_renderer.format == 'json':
			serialized = ArticleSerializer(articles)
			return Response(serialized.data)
		else:  
			return render(request,'articleblock.html',{'articles':articles})




#Devuelve informacion sobre todos los tipos de dispositivos.
@api_view(['GET'])
@login_required
def getDevices(request,device=None):
	if device is not None:
		device = Device.objects.filter(device_detail__iexact=device)
	else:
		device = Device.objects.all()
	data = DeviceSerializer(device)
	return Response(data.data)

#Devuelve informacion sobre todas las marcas disponibles
@api_view(['GET'])
@login_required
def getBrands(request,brand=None):
	if brand is not None:
		brand = Brand.objects.filter(brand__iexact=brand)
	else:
		brand = Brand.objects.all()
	data = BrandSerializer(brand)
	return Response(data.data)
#Devuelve informacion sobre todas los modelos disponibles

@api_view(['GET'])
@login_required
def getModels(request,brand = None):
	if brand is not None:
		brand_selected = get_object_or_404(Brand,brand__iexact=brand)
		models = brand_selected.brandmodel_set.all()
	else:
		models = BrandModel.objects.all()
	data = BrandModelSerializer(models)
	return Response(data.data)
	


#Devuelve los ultimos articulos subidos.
@api_view(['GET'])
@login_required
def getNewUploadedArticles(request,group=1):
	articles = Article.objects.all().order_by('-date_posted') 
	data = Paginator(articles,group).object_list
	return articleRenderizer(request,data)

	
#Devuelve los mas populares (segun cantidad de likes), no ha sido testeado.
@api_view(['GET'])
@login_required
def getMostPopularArticles(request,response='html'):
	data = Like.objects.all().annotate(like_count=Count('article')).order_by('-like_count')[:10]
	return articleRenderizer(request,data)
#Devuelve los articulos más interesantes, segun cantidad de me_interesa.
	
@api_view(['GET'])
@login_required
def getInterestingArticles(request,response='htl'):
	interesting_articles = Interested.objects.filter(user=request.user)
	return articleRenderizer(request,data)
#Devuelve los archivos subidos por el usuario.
@api_view(['GET'])
@login_required
def getMyArticles(request,response='html'):
	articles = Article.objects.filter(user=request.user)
	return articleRenderizer(request,articles)