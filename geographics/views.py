from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.filters import SearchFilter,DjangoFilterBackend

from .models import Province,City
from .serializers import CitySerializer,ProvinceSerializer
from .filters import ProvinceFilter,CityFilter

class ProvinceSet(viewsets.ModelViewSet):
	queryset = Province.objects.all()
	serializer_class = ProvinceSerializer
	permission_classes = (IsAuthenticatedOrReadOnly,)
	
	def get_queryset(self):
		queryset = Province.objects.all()
		province_name = self.request.QUERY_PARAMS.get('province_name', None)
		if province_name is not None:
			queryset = queryset.filter(province_name__iexact=province_name)
		return queryset



class CitySet(viewsets.ModelViewSet):
	queryset = City.objects.all()
	serializer_class = CitySerializer
	permission_classes = (IsAuthenticatedOrReadOnly,)
	
	def get_queryset(self):
		queryset = City.objects.all()
		city_name = self.request.QUERY_PARAMS.get('city_name', None)
		if city_name is not None:
			queryset = queryset.filter(city_name__iexact=city_name)
		return queryset

