from django.conf.urls import patterns, include, url
from rest_framework import routers

urlpatterns = patterns('',
	url(r'^devices/(?P<device>\w+|[0-9]+)/$', 'articles.views.getDevices'), #/devices/celulares
	url(r'^brands/(?P<brand>\w+|[0-9]+)/$', 'articles.views.getBrands'), #/brands/samsung
	url(r'^models/(?P<model>\w+|[0-9]+)/$', 'articles.views.getModels'), #/models/s4
    url(r'^new/(?P<group>\d+)/$', 'articles.views.getNewUploadedArticles'),
    url(r'^popular/$', 'articles.views.getMostPopularArticles'),
    url(r'^interesting/$', 'articles.views.getInterestingArticles'),
    url(r'^my/$', 'articles.views.getMyArticles'),
)