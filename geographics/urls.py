from django.conf.urls import patterns, include, url

from geographics.views import CitySet,ProvinceSet
from rest_framework.routers import DefaultRouter

# Create a router and register our viewsets with it.

router = DefaultRouter()

router.register('cities',CitySet)
router.register('provinces',ProvinceSet)

urlpatterns = patterns('',
    url(r'^', include(router.urls)),
)   
