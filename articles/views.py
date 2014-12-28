# -*- encoding: utf-8 -*-
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status
from rest_framework import filters 
from rest_framework.decorators import detail_route
from rest_framework.parsers import FormParser,MultiPartParser

from django.shortcuts import render,get_object_or_404
from django.db.models import Count,Q

from articles.forms import ArticleForm
from articles.models import Article,ArticlePicture,Interested,Like,BrandModel,Brand,Device,Comment,Like
from articles.serializers import ArticleSerializer, BrandModelSerializer,BrandSerializer,DeviceSerializer,ArticlePictureSerializer,LikeSerializer,CommentSerializer,InterestingSerializer

def articleIndex(request):
	if bool(request.user.is_anonymous()):
		return render(request,'index.html')
	return render(request,'articles.html')

class ArticleSet(viewsets.ModelViewSet):
	#queryset = Article.objects.all()
	serializer_class = ArticleSerializer
	permission_classes = (IsAuthenticatedOrReadOnly,)
	base_name = 'article'
	paginate_by = 5

	def create(self,request):
		user = request.user
		serializer = ArticleSerializer(data=request.DATA,context={'request':request})
		if serializer.is_valid():
			serializer.save(user=user)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	@detail_route(methods=['DELETE',])
	def delete_like(self,request,pk=None):
		try:
			article = self.get_object()
			user = request.user
			like_requested = Like.objects.filter(Q(article=article),Q(user=user))
			like_requested.delete()
			return Response({'response':'deleted'}, status=status.HTTP_200_OK)
		except:
			return Response({'response':'Error in transaction'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
	@detail_route(methods=['DELETE',])
	def delete_interesting(self,request,pk=None):
		try:
			article = self.get_object()
			user = request.user
			interested_requested = Interested.objects.filter(Q(article=article),Q(user=user))
			interested_requested.delete()
			return Response({'status':'deleted'}, status=status.HTTP_200_OK)
		except:
			return Response({'status':'Error in transaction'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


	def get_queryset(self):
		try:
			requested_query = self.request.GET['list'] #new, popular,interesting, selling 
			if requested_query == 'new':
				queryset = Article.objects.all().order_by('-date_posted')
			elif requested_query == 'popular':
				queryset = Article.objects.all().annotate(like_count=Count('like')).order_by('-like_count')
			elif requested_query == 'selling':
				queryset = self.request.user.article_set.all()
			elif requested_query == 'interesting':
				queryset = []
				articles = Interested.objects.filter(user=self.request.user)
				for a in articles:
					queryset.append(a.article)
			elif self.request.GET['me']:
				queryset = request.user.article_set.all()
			else:
				queryset = Article.objects.all()
		except:
				queryset = Article.objects.all()
		return queryset

	
class ArticlePictureSet(viewsets.ModelViewSet):
	queryset = ArticlePicture.objects.all()
	serializer_class = ArticlePictureSerializer
	permission_classes = (IsAuthenticatedOrReadOnly,)
	parser_classes = (MultiPartParser,FormParser)
	def create(self,request):
		serializer = ArticlePictureSerializer(data=request.data,context={'request':request})
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentSet(viewsets.ModelViewSet):
	queryset = Comment.objects.all()
	serializer_class = CommentSerializer
	permission_classes = (IsAuthenticatedOrReadOnly,)
	def create(self,request):
		user = request.user
		serializer = CommentSerializer(data=request.DATA,context={'request':request})
		if serializer.is_valid():
			serializer.save(user=user)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BrandModelSet(viewsets.ModelViewSet):
	queryset = BrandModel.objects.all()
	permission_classes = (IsAuthenticatedOrReadOnly,)
	serializer_class = BrandModelSerializer
	filter_fields = ('model_name',) 


class BrandSet(viewsets.ModelViewSet):
	queryset = Brand.objects.all()
	permission_classes = (IsAuthenticatedOrReadOnly,)
	serializer_class = BrandSerializer
	filter_fields = ('brand',) 

class DeviceSet(viewsets.ModelViewSet):
	queryset = Device.objects.all()
	permission_classes = (IsAuthenticatedOrReadOnly,)
	serializer_class = DeviceSerializer
	filter_fields = ('device_detail',)

class LikeSet(viewsets.ModelViewSet):
	queryset = Like.objects.all()
	serializer_class = LikeSerializer
	permission_classes = (IsAuthenticatedOrReadOnly,)
	def create(self,request):
		user = request.user
		serializer = LikeSerializer(data=request.DATA,context={'request':request})
		if serializer.is_valid():
			serializer.save(user=user)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		else:
			return Response({'status':'Error, this like instance was created already,because %s' % serializer.errors}, status=status.HTTP_409_CONFLICT)				
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InterestingSet(viewsets.ModelViewSet):
	queryset = Interested.objects.all()
	serializer_class = InterestingSerializer
	permission_classes = (IsAuthenticatedOrReadOnly,)
	def create(self,request):
		user = request.user
		serializer = InterestingSerializer(data=request.DATA,context={'request':request})
		if serializer.is_valid():
			instance = serializer.save(user=user)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		else:
			return Response({'status':'Error, this like instance was created already,because %s' % serializer.errors}, status=status.HTTP_409_CONFLICT)				
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)