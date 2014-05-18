from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^me/$', 'users.views.getUserIndex'),
    url(r'^me/following/$', 'users.views.getCurrentUserFollows'),
    url(r'^me/followers/$', 'users.views.getCurrentUserFollowers'),
    url(r'^login/$', 'users.views.loginUser'),
    url(r'^(?P<username>[a-z0-9_-]{3,50})/$', 'users.views.userManager'),
    url(r'^(?P<pk>\d+)/$', 'users.views.userManager'),
)