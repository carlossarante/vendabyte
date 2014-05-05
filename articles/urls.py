from django.conf.urls import patterns, include, url
from articles.views import ArticleViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'all',ArticleViewSet)

urlpatterns = patterns('',
	url(r'^',include(router.urls)),
    url(r'^new/(?P<group>\d+)/$', 'articles.views.getNewUploadedArticles'),
    url(r'^popular/$', 'articles.views.getMostPopularArticles'),
    url(r'^interesting/$', 'articles.views.getInterestingArticles'),
    url(r'^my-articles/$', 'articles.views.getMyArticles'),
)