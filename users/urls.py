from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
	url(r'^$', 'users.views.userIndex'), 
	url(r'^login/$', 'users.views.loginFacebookUser'),
    url(r'^(?P<username>[a-z0-9_-]{3,16})/$', 'users.views.userIndex'),
)   
