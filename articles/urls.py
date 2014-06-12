from django.conf.urls import patterns, include, url
<<<<<<< HEAD
from articles.views import ArticleSet,CommentSet,BrandModelSet,BrandSet,DeviceSet,NewArticlesSet,PopularArticlesSet
=======
from articles.views import ArticleSet,CommentSet,BrandModelSet,BrandSet,DeviceSet,PopularArticlesSet,NewArticlesSet
>>>>>>> 2f213079acbc99036da5d2dc243d0bb8e1a8aad6

from rest_framework.routers import DefaultRouter

# Create a router and register our viewsets with it.

router = DefaultRouter()

router.register('article',ArticleSet)
<<<<<<< HEAD
#router.register('popular',PopularArticlesSet)
=======
>>>>>>> 2f213079acbc99036da5d2dc243d0bb8e1a8aad6
#router.register('new',NewArticlesSet)
router.register('comment',CommentSet)
router.register('models',BrandModelSet)
router.register('brands',BrandSet)
router.register('devices',DeviceSet)

urlpatterns = patterns('',
    url(r'^$', 'articles.views.articleIndex'),
    url(r'^api/', include(router.urls)),
)   

