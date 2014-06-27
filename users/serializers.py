import json
from rest_framework import serializers
#from articles.serializers import ShortUserSerializer
from geographics.serializers import CitySerializer
from users.models import User,Badgets,Contact

class ShortUserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model =User
		fields = ('id','url','first_name','last_name','username','photo')

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
	followers = ShortUserSerializer(read_only=True)
	date_joined = serializers.Field(source='date_joined')
	average_rating = serializers.Field('average_rating')
	class Meta:
		model = User
		fields = ('id','first_name','last_name','birthday','username','photo','cover','city','medals','followers','contact','rating_set','sex','date_joined','average_rating','facebook_uid')
		write_only_fields = ('facebook_uid',)