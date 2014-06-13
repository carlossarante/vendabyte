# -*- encoding: utf-8 -*-
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework import filters 

from django.shortcuts import render
from django.db.models import Count

from articles.forms import ArticleForm
from articles.models import Article,ArticlePicture,Interested,Like,BrandModel,Brand,Device,Comment,Like
from articles.serializers import ArticleSerializer, BrandModelSerializer,BrandSerializer,DeviceSerializer,ArticlePictureSerializer,LikeSerializer,CommentSerializer,InterestingSerializer

#import django_filters

def articleIndex(request):
	return render(request,'articles.html')

class ArticleSet(viewsets.ModelViewSet):
	queryset = Article.objects.all()
	serializer_class = ArticleSerializer
	def create(self,request):
		user = request.user
		serializer = ArticleSerializer(data=request.DATA)
		if serializer.is_valid():
			serializer.object.user = user
			serializer.object.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ArticlePictureSet(viewsets.ModelViewSet):
	queryset = ArticlePicture.objects.all()	
	serializer_class = ArticlePictureSerializer
	def create(self,request):
		user = request.user
		serializer = ArticlePictureSerializer(data=request.DATA,files=request.FILES)
		if serializer.is_valid():
			if not (serializer.object.article.user.username == request.user.username):
				return Response(status.HTTP_403_FORBIDDEN)
			serializer.object.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PopularArticlesSet(viewsets.ReadOnlyModelViewSet):
	queryset = Article.objects.all().annotate(like_count=Count('like')).order_by('-like_count')[:10]
	serializer_class = ArticleSerializer

class NewArticlesSet(viewsets.ReadOnlyModelViewSet):
	queryset = Article.objects.all().order_by('-date_posted')[:10]
	serializer_class = ArticleSerializer

class CommentSet(viewsets.ModelViewSet):
	queryset = Comment.objects.all()
	serializer_class = CommentSerializer
	def create(self,request):
		user = request.user
		serializer = CommentSerializer(data=request.DATA)
		if serializer.is_valid():
			if not (serializer.object.article.user.username == request.user.username):
				return Response(status.HTTP_403_FORBIDDEN)
			serializer.object.user = user
			serializer.object.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BrandModelSet(viewsets.ModelViewSet):
	queryset = BrandModel.objects.all()
	serializer_class = BrandModelSerializer
	filter_fields = ('model_name',) 


class BrandSet(viewsets.ModelViewSet):
	queryset = Brand.objects.all()
	serializer_class = BrandSerializer
	filter_fields = ('brand',) 

class DeviceSet(viewsets.ModelViewSet):
	queryset = Device.objects.all()
	serializer_class = DeviceSerializer
	filter_fields = ('device_detail',)

class LikeSet(viewsets.ModelViewSet):
	queryset= Like.objects.all()
	serializer_class = LikeSerializer
	def create(self,request):
		user = request.user
		serializer = LikeSerializer(data=request.DATA)
		if serializer.is_valid():
			if not (serializer.object.article.user.username == request.user.username):
				return Response(status.HTTP_403_FORBIDDEN)
			serializer.object.user = user
			serializer.object.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InterestingSet(viewsets.ModelViewSet):
	queryset = Interested.objects.all()
	serializer_class = InterestingSerializer
	def create(self,request):
		user = request.user
		serializer = InterestingSerializer(data=request.DATA)
		if serializer.is_valid():
			if not (serializer.object.article.user.username == request.user.username):
				return Response(status.HTTP_403_FORBIDDEN)
			serializer.object.user = user
			serializer.object.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
