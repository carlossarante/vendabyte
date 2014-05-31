# -*- encoding: utf-8 -*-

from rest_framework import viewsets

from django.shortcuts import render, HttpResponseRedirect,HttpResponse,get_object_or_404,redirect
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.db.models import Count


from users.models import User,Badgets,Contact
from users.serializers import UserSerializer,BadgetSerializer,ContactSerializer

class UserSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer
class BadgetSet(viewsets.ReadOnlyModelViewSet):
	queryset = Badgets.objects.all()
	serializer_class = BadgetSerializer

class ContactSet(viewsets.ModelViewSet):
	queryset= Contact.objects.all()
	serializer_class= ContactSerializer