import json
from rest_framework import serializers
from users.models import User,Badgets,Contact

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('first_name','last_name','birthday','username','photo','cover','city','rating','medals','following',)


class BadgetSerializer(serializers.ModelSerializer):
	class Meta:
		model = Badgets

class ContactSerializer(serializers.ModelSerializer):
	class Meta:
		model = Contact