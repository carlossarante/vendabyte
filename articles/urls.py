from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^new/(?P<group>d+)/$', 'articles.views.getNewUploadedArticles'),
    url(r'^popular/$', 'articles.views.getMostPopularArticles'),
    url(r'^interesting/$', 'articles.views.getInterestingArticles'),
    url(r'^my-articles/$', 'articles.views.getMyArticles'),
)