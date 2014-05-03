from django.shortcuts import render
from rest_framework import viewsets
from .models import Province,City


class CityView(viewsets.ModelViewSet):
	model = City

class ProvinceView(viewsets.ModelViewSet):
	model = Province