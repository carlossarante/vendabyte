# -*- encoding: utf-8 -*-
from rest_framework import viewsets

from django.shortcuts import render
from django.db.models import Count

from articles.forms import ArticleForm
from articles.models import Article,ArticlePicture,Interested,Like,BrandModel,Brand,Device,Comment,Like
from articles.serializers import ArticleSerializer, BrandModelSerializer,BrandSerializer,DeviceSerializer,ArticlePictureSerializer,LikeSerializer,CommentSerializer,InterestingSerializer


def articleIndex(request):
	return render(request,'articles.html')

class ArticleSet(viewsets.ModelViewSet):
	queryset = Article.objects.all()
	serializer_class = ArticleSerializer


class PopularArticlesSet(viewsets.ReadOnlyModelViewSet):
	queryset = Article.objects.all().annotate(like_count=Count('like')).order_by('-like_count')[:10]
	serializer_class = ArticleSerializer

class NewArticlesSet(viewsets.ReadOnlyModelViewSet):
	queryset = Article.objects.all().order_by('-date_posted')[:10]
	serializer_class = ArticleSerializer


class CommentSet(viewsets.ModelViewSet):
	queryset = Comment.objects.all()
	serializer_class = CommentSerializer

class BrandModelSet(viewsets.ModelViewSet):
	queryset = BrandModel.objects.all()
	serializer_class = BrandModelSerializer

class BrandSet(viewsets.ModelViewSet):
	queryset = Brand.objects.all()
	serializer_class = BrandSerializer

class DeviceSet(viewsets.ModelViewSet):
	queryset = Device.objects.all()
	serializer_class = DeviceSerializer
