import json
from rest_framework import serializers
#from articles.serializers import ShortUserSerializer
from geographics.serializers import CitySerializer
from users.models import User,Badgets,Contact

class ShortUserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model =User
		fields = ('id','url','first_name','last_name','username','photo')

class UserSerializer(serializers.HyperlinkedModelSerializer):
	followers = ShortUserSerializer(read_only=True)
	class Meta:
		model = User
		fields = ('id','first_name','last_name','birthday','username','photo','cover','city','rating','medals','followers','contact')


class BadgetSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Badgets
		fields = ('url','id','medal_name','medal_icon')


class ContactSerializer(serializers.ModelSerializer):
	class Meta:
		model = Contact