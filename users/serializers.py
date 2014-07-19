import json
from rest_framework import serializers
#from articles.serializers import ShortUserSerializer
from django.db.models import Q

from geographics.serializers import CitySerializer
from users.models import User,Badgets,Contact



class ShortUserSerializer(serializers.HyperlinkedModelSerializer):
	user_following = serializers.SerializerMethodField('is_following')
	class Meta:
		model =User
		fields = ('id','url','first_name','last_name','photo','user_following')
	
	def is_following(self,obj):
		request = self.context.get('request',None)
		if (request is None) or bool(request.user.is_anonymous()):
			return False
		following =  obj.followers.filter(id=request.user.id)
		if not following:
			return False
		return True

class ContactSerializer(serializers.ModelSerializer):
	class Meta:
		model = Contact

class BadgetSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Badgets
		fields = ('url','id','medal_name','medal_icon')


class UserSerializer(serializers.HyperlinkedModelSerializer):
	medals = BadgetSerializer(source='medals',read_only=True)
	contact = ContactSerializer(read_only=True)
	#followers = ShortUserSerializer(read_only=True)
	date_joined = serializers.Field(source='date_joined')
	average_rating = serializers.Field('average_rating')
	user_following = serializers.SerializerMethodField('is_following')
	quantity_followers = serializers.SerializerMethodField('cant_followers')
	quantity_following = serializers.SerializerMethodField('cant_following')
	class Meta:
		model = User
		fields = (
			'id',
			'email',
			'first_name',
			'last_name',
			'birthday',
			'photo',
			'cover',
			'city',
			'medals',
			'contact',
			'rating_set',
			'sex',
			'date_joined',
			'average_rating',
			'facebook_uid',
			'user_following',
			'quantity_followers',
			'quantity_following',
			)
		write_only_fields = ('facebook_uid',)

	def cant_followers(self,obj):
		try:
			q_followers = obj.followers.count()
			return q_followers
		except:
			return 0
	def cant_following(self,obj):
		try:
			q_following = obj.follows.count()
			return q_following
		except:
			return 0



	def is_following(self,obj):
		request = self.context.get('request',None)
		if request is None:
			return False
		if request.user.is_anonymous():
			return False
		following =  obj.followers.filter(id=request.user.id)
		if not following:
			return False
		return True