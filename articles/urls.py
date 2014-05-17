from django.conf.urls import patterns, include, url




urlpatterns = patterns('',
    
	url(r'^devices/(?P<device>\w+|[0-9]+)/$', 'articles.views.getDevices'), #/devices/celulares
	url(r'^devices/$', 'articles.views.getDevices'),
	
    url(r'^brands/(?P<brand>\w+|[0-9]+)/$', 'articles.views.getBrands'), #/brands/samsung
	url(r'^brands/$', 'articles.views.getBrands'),
	
    url(r'^models/(?P<brand>\w+|[0-9]+)/$', 'articles.views.getModels'), #/models/s4
	url(r'^models/$', 'articles.views.getModels'), #/models/s4
    
    url(r'^new/(?P<group>\d+)/$', 'articles.views.getNewUploadedArticles'),
    
    url(r'^popular/$', 'articles.views.getMostPopularArticles'),
    
    
    
    url(r'^my/$', 'articles.views.getMyArticles'),
    
    url(r'^detail/(?P<pk>\d+)/$', 'articles.views.articleDetail'),
    
    url(r'^(?P<group>\d+)/$', 'articles.views.articleList'),
    
    url(r'^upload/form/$', 'articles.views.uploadArticleForm'), #/uploadform
    
    url(r'^comment/(?P<pk>\d+)/$', 'articles.views.CommentManager'),

    url(r'^like/(?P<pk>\d+)/$', 'articles.views.LikeManager'), #/uploadform
    
    url(r'^interesting/(?P<pk>\d+)/$', 'articles.views.InterestingManager'),

)