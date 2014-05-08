from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^me/articles/(?P<response>\json)/$', 'users.views.getCurrentUserArticles'), 
    url(r'^me/articles/$', 'users.views.getCurrentUserArticles'),
    url(r'^me/following/(?P<response>\json)/$', 'users.views.getCurrentUserFollows'),
    url(r'^me/following/$', 'users.views.getCurrentUserFollows'),
    url(r'^me/followers/(?P<response>\json)/$', 'users.views.getCurrentUserFollowers'),
    url(r'^me/followers/$', 'users.views.getCurrentUserFollowers'),
   #url(r'^me/followers/$', 'users.views.getCurrentUserFollowers'),
    url(r'^login/$', 'users.views.loginUser'),
    #url(r'^(?P<username>[a-z0-9_-]{3,50})/$', 'users.views.getUser'),
)