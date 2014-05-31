from rest_framework import serializers
import json
import decimal
from .models import Article, ArticlePicture,Brand, BrandModel, Device,Like,Comment,Interested
from users.serializers import UserSerializer
from users.models import User



class CommentSerializer(serializers.HyperlinkedModelSerializer):
	user = UserSerializer()
	class Meta:	
		model = Comment
		fields = ('url','date_posted','user','comment','article')

class ArticlePictureSerializer(serializers.ModelSerializer):
	class Meta:
		model = ArticlePicture

class ShortUserSerializer(serializers.ModelSerializer):
	class Meta:
		model =User
		fields = ('id','first_name','last_name','username','photo')



class ArticleSerializer(serializers.HyperlinkedModelSerializer):
	user = ShortUserSerializer()
	comment_set = CommentSerializer()
	class Meta:
		model = Article
		fields = ('id','model','user','short_description','price','specs','date_posted','articlepicture_set','comment_set')


class BrandSerializer(serializers.HyperlinkedModelSerializer):
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


class InterestingSerializer(serializers.ModelSerializer):
	class Meta:
		model = Interested
