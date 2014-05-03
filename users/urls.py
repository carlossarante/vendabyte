from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'vendabyte.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^sessions/', 'users.views.getSession'),
    url(r'^(?P<username>[a-z0-9_-]{3,50})/', 'users.views.getUser'),
)