from rest_framework.validators import UniqueTogetherValidator
from rest_framework import serializers
import json
import decimal
from articles.models import Article, ArticlePicture,Brand, BrandModel, Device,Like,Comment,Interested
from users.serializers import UserSerializer,ShortUserSerializer
from users.models import User
from django.utils import timezone

class CommentSerializer(serializers.HyperlinkedModelSerializer):
	user = ShortUserSerializer(read_only=True)
	class Meta:	
		model = Comment
		fields = ('url','date_posted','user','comment','article')

class ArticlePictureSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = ArticlePicture
		fields = ('art_img','article','cover')


class BrandModelSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = BrandModel
		fields = ('url','brand','model_name')

class BrandSerializer(serializers.HyperlinkedModelSerializer):
	brandmodel_set= serializers.StringRelatedField(many=True)
	class Meta:
		model = Brand
		fields = ('url','device','brand','brandmodel_set')


class DeviceSerializer(serializers.HyperlinkedModelSerializer):
	brand_set = serializers.StringRelatedField(many=True)
	class Meta:
		model = Device
		fields = ('url','device_detail','brand_set')




class ArticleSerializer(serializers.HyperlinkedModelSerializer):
	user = UserSerializer(read_only=True)
	articlepicture_set = ArticlePictureSerializer(read_only=True,many=True)
	model_name = serializers.StringRelatedField(source='model.model_name')
	interested = serializers.SerializerMethodField('is_interested')
	liked = serializers.SerializerMethodField('is_liked')
	comment_set = CommentSerializer(read_only=True,many=True)
	class Meta:
		model = Article
		fields = ('url','model','model_name','user','short_description','articlepicture_set','price','specs','date_posted','comment_set','interested_count','like_count','liked','interested')		
	
	def is_interested(self,obj):
		if obj is None:
			return False
		request = self.context.get('request',None)
		if request.user.is_anonymous():
			return False
		article_is_interesting = obj.interested_set.filter(user=request.user)
		if not article_is_interesting:
			return False
		return True

	def is_liked(self,obj):
		if obj is None:
			return False
		request = self.context.get('request',None)
		if request.user.is_anonymous():
			return False
		article_is_liked = obj.like_set.filter(user=request.user)
		if not article_is_liked:
			return False
		return True


class LikeSerializer(serializers.HyperlinkedModelSerializer):
	user = ShortUserSerializer(read_only=True)
	class Meta:
		validators = [
		UniqueTogetherValidator(
			queryset = Like.objects.all(),
			fields = ('article','user')
			)
		]
		model = Like
		fields = ('article','user')


class InterestingSerializer(serializers.HyperlinkedModelSerializer):
	#user = ShortUserSerializer(read_only=True)
	class Meta:
		validators = [
		UniqueTogetherValidator(
			queryset = Interested.objects.all(),
			fields = ('article','user')
			)
		]
		model = Interested
