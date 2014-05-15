from rest_framework import serializers
import json
import decimal
from .models import Article, ArticlePicture,Brand, BrandModel, Device,Like,Comment,Interested
from users.models import User

class ArticlePictureSerializer(serializers.ModelSerializer):
	class Meta:
		model = ArticlePicture
class ShortUserSerializer(serializers.ModelSerializer):
	class Meta:
		model =User
		fields = ('id','first_name','last_name','username','photo')
class ArticleSerializer(serializers.ModelSerializer):
	user = ShortUserSerializer()
	class Meta:
		model = Article
		fields = ('model','user','short_description','price','specs','date_posted','articlepicture_set','comment_set')

class BrandSerializer(serializers.ModelSerializer):
	class Meta:
		model = Brand

class BrandModelSerializer(serializers.ModelSerializer):
	class Meta:
		model = BrandModel

class DeviceSerializer(serializers.ModelSerializer):
	class Meta:
		model = Device

class LikeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Like

class CommentSerializer(serializers.ModelSerializer):
	class Meta:	
		model = Comment

class InterestingSerializer(serializers.ModelSerializer):
	class Meta:
		model = Interested
