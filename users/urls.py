from django.conf.urls import patterns, include, url
from rest_framework import routers




urlpatterns = patterns('',
    # Examples:
   	#url(r'^$', 'users.views.getNewUploadedArticles'),
    # url(r'^blog/', include('blog.urls')),
    #url(r'^sessions/', 'users.views.getSession'),
    url(r'^user/', 'users.views.getUser'),
    url(r'^login/', 'users.views.loginUser'),
)