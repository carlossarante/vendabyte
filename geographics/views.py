from django.shortcuts import render
from .models import Province,City


def getCity(city,province):
	city, is_created = City.objects.get_or_create(city_name__iexact=city,province=getProvince(province))
	return p

def Province(province):
	province, is_created = Province.objects.get_or_create(province_name__iexact=province)
	return p