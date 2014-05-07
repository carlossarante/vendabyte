from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    # Examples:
   	#url(r'^$', 'users.views.getNewUploadedArticles'),
    url(r'^articles/$', 'users.views.getCurrentUserArticles'),
    url(r'^login/$', 'users.views.loginUser'),
    url(r'^(?P<username>[a-z0-9_-]{3,50})/', 'users.views.getUser'),
)