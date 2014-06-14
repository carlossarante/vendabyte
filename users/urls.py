from rest_framework.routers import DefaultRouter
from django.conf.urls import patterns, include, url

from users.views import UserSet,ContactSet,BadgetSet

router = DefaultRouter()

router.register('user',UserSet,base_name='user')
router.register('contact',ContactSet)
router.register('badgets',BadgetSet)


urlpatterns = patterns('',
	url(r'^$', 'users.views.userIndex'), 
	url(r'^login/$', 'users.views.loginFacebookUser'),
    url(r'^api/', include(router.urls)),
)   
