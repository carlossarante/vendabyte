from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    # Examples:
   	#url(r'^$', 'users.views.getNewUploadedArticles'),
    # url(r'^blog/', include('blog.urls')),
    #url(r'^sessions/', 'users.views.getSession'),
    url(r'^user/', 'users.views.getUser'),
    url(r'^login/', 'users.views.loginUser'),
    url(r'^articles/$', 'users.views.getCurrentUserArticles'),
    url(r'^login/$', 'users.views.loginUser'),
    url(r'^(?P<username>[a-z0-9_-]{3,50})/', 'users.views.getUser'),
)