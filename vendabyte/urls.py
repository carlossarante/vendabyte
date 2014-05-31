from django.conf.urls import patterns, include, url
from django.conf import settings
from django.contrib import admin
admin.autodiscover()


urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'vendabyte.views.home', name='home'),
    url(r'^articles/', include('articles.urls')),
    url(r'^geographics/', include('geographics.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^users/',include('users.urls')),
)

if settings.DEBUG:

	urlpatterns += patterns('',
		url(r'^media/(?P<path>.*)$','django.views.static.serve',{'document_root':settings.MEDIA_ROOT}),
		url(r'^static/(?P<path>.*)$','django.views.static.serve',{'document_root':settings.STATIC_ROOT}),
		)