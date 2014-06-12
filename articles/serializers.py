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
		fields = ('id','first_name','last_name','username','photo')

class DeviceSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Device
		fields = ('id','url','device_detail')

class CommentSerializer(serializers.HyperlinkedModelSerializer):
	user = ShortUserSerializer(read_only=True)
	class Meta:	
		model = Comment
		fields = ('id','url','date_posted','user','comment','article')

class ArticlePictureSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = ArticlePicture


class BrandSerializer(serializers.HyperlinkedModelSerializer):
	device = DeviceSerializer()
	class Meta:
		model = Brand
		fields = ('id','device','brand')


class BrandModelSerializer(serializers.HyperlinkedModelSerializer):
	#brand = BrandSerializer()
	class Meta:
		model = BrandModel
		fields = ('brand','model_name')


class ArticleSerializer(serializers.HyperlinkedModelSerializer):
<<<<<<< HEAD
	model = BrandModelSerializer()
	#user = UserSerializer()
	#comment_set = CommentSerializer(required=False)
	#articlepicture_set = ArticlePictureSerializer()
	date_posted = serializers.Field(source='date_posted')
	class Meta:
		model = Article
		fields = ('id','url','model','user','short_description','price','specs','date_posted','comment_set')




=======
	date_posted = serializers.Field(source='date_posted')
	comment_set = CommentSerializer(read_only=True)
	articlepicture_set = ArticlePictureSerializer(read_only=True)
	#model = BrandModelSerializer()
	user = ShortUserSerializer(read_only=True)
	class Meta:
		model = Article
		fields = ('id','model','user','short_description','price','specs','date_posted','articlepicture_set','comment_set')
		#depth = 1	

>>>>>>> 2f213079acbc99036da5d2dc243d0bb8e1a8aad6
class LikeSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Like


class InterestingSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Interested
