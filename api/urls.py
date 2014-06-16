from rest_framework.routers import DefaultRouter


from django.conf.urls import patterns, include, url

from users.views import UserSet,ContactSet,BadgetSet
from geographics.views import CitySet,ProvinceSet
from articles.views import ArticleSet,CommentSet,BrandModelSet,BrandSet,DeviceSet,NewArticlesSet,PopularArticlesSet,LikeSet,InterestingSet,ArticlePictureSet


router = DefaultRouter()

#Article's URLs

router.register('article',ArticleSet,base_name='article')
router.register('picture',ArticlePictureSet)
router.register('comment',CommentSet)
router.register('models',BrandModelSet)
router.register('brands',BrandSet)
router.register('devices',DeviceSet)
router.register('likes',LikeSet)
router.register('interesting',InterestingSet)

#User's URLS

router.register('user',UserSet,base_name='user')
router.register('contact',ContactSet)
router.register('badgets',BadgetSet)

#Geographics

router.register('cities',CitySet)
router.register('provinces',ProvinceSet)



urlpatterns = patterns('',
    url(r'', include(router.urls)),
)   


