from rest_framework import serializers
import json
import decimal
from .models import Article, ArticlePicture,Brand, BrandModel, Device,Like,Comment,Interested
from users.serializers import UserSerializer
from users.models import User
from django.utils import timezone

class ShortUserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model =User
		fields = ('id','url','first_name','last_name','username','photo')

class CommentSerializer(serializers.HyperlinkedModelSerializer):
	date_posted = serializers.Field(source='date_posted')
	user = ShortUserSerializer(read_only=True)
	class Meta:	
		model = Comment
		fields = ('id','url','date_posted','user','comment','article')


class ArticlePictureSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = ArticlePicture

class BrandModelSerializer(serializers.HyperlinkedModelSerializer):
	#brand = BrandModelSerializer()
	class Meta:
		model = BrandModel
		fields = ('id','url','brand','model_name')

class BrandSerializer(serializers.HyperlinkedModelSerializer):
	brandmodel_set = serializers.RelatedField(many=True)
	class Meta:
		model = Brand
		fields = ('id','url','device','brand','brandmodel_set')


class DeviceSerializer(serializers.HyperlinkedModelSerializer):
	brand_set = serializers.RelatedField(many=True)
	class Meta:
		model = Device
		fields = ('id','url','device_detail','brand_set')


class ArticleSerializer(serializers.HyperlinkedModelSerializer):
	date_posted = serializers.Field(source='date_posted')
	comment_set = CommentSerializer(read_only=True)
	articlepicture_set = ArticlePictureSerializer(read_only=True)
	user = ShortUserSerializer(read_only=True)
	like_count = serializers.Field(source='getLikeCount')
	interested_count = serializers.Field(source='getInterestedCount')
	class Meta:
		model = Article
		fields = ('id','url','model','user','short_description','price','specs','date_posted','articlepicture_set','comment_set','like_count','interested_count')

class LikeSerializer(serializers.HyperlinkedModelSerializer):
	user = ShortUserSerializer(read_only=True)
	class Meta:
		model = Like
		fields = ('id','article','user')


class InterestingSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Interested
