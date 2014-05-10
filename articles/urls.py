from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
	url(r'^devices/(?P<device>\w+|[0-9]+)/$', 'articles.views.getDevices'), #/devices/celulares
	url(r'^devices/$', 'articles.views.getDevices'),
	url(r'^brands/(?P<brand>\w+|[0-9]+)/$', 'articles.views.getBrands'), #/brands/samsung
	url(r'^brands/$', 'articles.views.getBrands'),
	url(r'^models/(?P<model>\w+|[0-9]+)/$', 'articles.views.getModels'), #/models/s4
	url(r'^models/$', 'articles.views.getModels'), #/models/s4
    url(r'^new/(?P<group>\d+)/$', 'articles.views.getNewUploadedArticles'),
    url(r'^new/(?P<group>\d+)/(?P<response>\json)/$', 'articles.views.getNewUploadedArticles'),
    url(r'^popular/(?P<response>\json)/$', 'articles.views.getMostPopularArticles'),
    url(r'^popular/$', 'articles.views.getMostPopularArticles'),
    url(r'^interesting/(?P<response>\json)/$', 'articles.views.getInterestingArticles'),
    url(r'^interesting/$', 'articles.views.getInterestingArticles'),
    url(r'^my/(?P<response>\json)/$', 'articles.views.getMyArticles'),
    url(r'^my/$', 'articles.views.getMyArticles'),
)