from rest_framework import serializers
from .models import Province,City

class ProvinceSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:	
		model = Province
		fields = ('url','id','province_name')

class CitySerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = City
		fields = ('url','id','province')
