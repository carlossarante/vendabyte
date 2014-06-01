import json
from rest_framework import serializers
from geographics.serializers import CitySerializer
from users.models import User,Badgets,Contact

class UserSerializer(serializers.ModelSerializer):
	city = CitySerializer()
	class Meta:
		model = User
		fields = ('id','first_name','last_name','birthday','username','photo','cover','city','rating','medals','following','contact')


class BadgetSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Badgets
		fields = ('url','id','medal_name','medal_icon')


class ContactSerializer(serializers.ModelSerializer):
	class Meta:
		model = Contact