from rest_framework import serializers
import json
import decimal
from .models import Article, ArticlePicture,Brand, BrandModel, Device,Like,Comment,Interested
from users.serializers import UserSerializer
from users.models import User

class DeviceSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Device
		fields = ('url','id','device_detail')

class CommentSerializer(serializers.HyperlinkedModelSerializer):
	user = UserSerializer()
	class Meta:	
		model = Comment
		fields = ('url','date_posted','user','comment','article')

class ArticlePictureSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = ArticlePicture

class ShortUserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model =User
		fields = ('url','id','first_name','last_name','username','photo')


class BrandSerializer(serializers.HyperlinkedModelSerializer):
	device = DeviceSerializer()
	class Meta:
		model = Brand
		fields = ('id','device','brand')


class BrandModelSerializer(serializers.HyperlinkedModelSerializer):
	brand = BrandSerializer()
	class Meta:
		model = BrandModel
		fields = ('url','brand','model_name')


class ArticleSerializer(serializers.HyperlinkedModelSerializer):
	#user = ShortUserSerializer()
	#comment_set = CommentSerializer()
	#model = BrandModelSerializer()
	class Meta:
		model = Article
		fields = ('id','model','user','short_description','price','specs','date_posted','articlepicture_set','comment_set')




class LikeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Like


class InterestingSerializer(serializers.ModelSerializer):
	class Meta:
		model = Interested
