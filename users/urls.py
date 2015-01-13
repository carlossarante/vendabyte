from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
	url(r'^$', 'users.views.userIndex'), 
	url(r'^login/$', 'users.views.loginFacebookUser'),
	url(r'^logout/$', 'users.views.logout_me'),
	url(r'^check_user/$', 'users.views.checkUserExistence'),
    url(r'^(?P<username>(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.]))/$', 'users.views.userIndex'),
)   
