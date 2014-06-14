from django.conf.urls import patterns, include, url
from articles.views import ArticleSet,CommentSet,BrandModelSet,BrandSet,DeviceSet,NewArticlesSet,PopularArticlesSet,LikeSet,InterestingSet,ArticlePictureSet

from rest_framework.routers import DefaultRouter

# Create a router and register our viewsets with it.

router = DefaultRouter()

router.register('article',ArticleSet,base_name='article')
#router.register('popular',PopularArticlesSet)
#router.register('new',NewArticlesSet)
router.register('picture',ArticlePictureSet)
router.register('comment',CommentSet)
router.register('models',BrandModelSet)
router.register('brands',BrandSet)
router.register('devices',DeviceSet)
router.register('likes',LikeSet)
router.register('interesting',InterestingSet)
urlpatterns = patterns('',
    url(r'^$', 'articles.views.articleIndex'),
    url(r'^api/', include(router.urls)),
)   

