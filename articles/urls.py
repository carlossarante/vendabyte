from django.conf.urls import patterns, include, url
from articles.views import ArticleSet,CommentSet,BrandModelSet

from rest_framework.routers import DefaultRouter

# Create a router and register our viewsets with it.

router = DefaultRouter()

router.register('article',ArticleSet)
router.register('comment',CommentSet)
router.register('models',BrandModelSet)

urlpatterns = patterns('',
    url(r'^$', 'articles.views.articleIndex'),
    url(r'^api/', include(router.urls)),
)   

