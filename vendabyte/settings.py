"""
Django settings for vendabyte project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '1u_oe&^1uyz+6qi)9z37be58%k7+3r$9bzi^gj1+$6r_b&-#ke'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'south',
    'users',
    'geographics',
    'articles',
    'rest_framework',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'vendabyte.urls'

WSGI_APPLICATION = 'vendabyte.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases


#Base de datos en desarrollo
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'vendabyte.sqllite3',
    }
}



'''
Esta es la base de datos que usamos en production.

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'vendabyte
        'USER':'root',
        'PASSWORD': 'vendeme',  
        'HOST': '',
        'PORT':3306,
    }
}
'''
# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

TEMPLATE_DIRS = (
    os.path.abspath('vendabyte/templates'),
    os.path.abspath('users/templates'),
    os.path.abspath('articles/templates'),
    os.path.abspath('geographics/templates'),
    )


MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.abspath('media')

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

#STATIC_

STATIC_URL = '/static/'
STATIC_ROOT = os.path.abspath('static')
STATICFILES_DIRS = (
    os.path.abspath('users/static'),
    os.path.abspath('geographics/static'),
    os.path.abspath('articles/static'),
)

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': 'c:/Projects/Python/vendabyte/vendabyte/cache',
    }
}


AUTH_USER_MODEL = 'users.User'
