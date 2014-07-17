from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly


from .models import Province,City
from .serializers import CitySerializer,ProvinceSerializer


class ProvinceSet(viewsets.ModelViewSet):
	queryset = Province.objects.all()
	serializer_class = ProvinceSerializer
	permission_classes = (IsAuthenticatedOrReadOnly,)
	filter_fields = ('province_name',)

class CitySet(viewsets.ModelViewSet):
	queryset = City.objects.all()
	serializer_class = CitySerializer
	filter_fields = ('city_name','province__province_name')
	permission_classes = (IsAuthenticatedOrReadOnly,)
