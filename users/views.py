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


def userIndex(request):
	return render(request,'user.html')

@csrf_exempt
def loginFacebookUser(request,response='html'):
	if request.method == 'POST': 
		email = request.POST['email']
		facebook_uid = request.POST['facebook_uid']
		user = authenticate(email=email,facebook_uid=facebook_uid)
		if user is not None:
			if user.is_active:
				login(request,user)
				return redirect(user)
			else:
 				return HttpResponse('User is not active')
		else:
 			 	try:
 			 		User.objects.get(email=email)
 			 		return HttpResponse('Wrong Password')
 			 	except User.DoesNotExist:
 			 		return HttpResponse('User Does not Exist')

class UserSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer
class BadgetSet(viewsets.ReadOnlyModelViewSet):
	queryset = Badgets.objects.all()
	serializer_class = BadgetSerializer

class ContactSet(viewsets.ModelViewSet):
	queryset= Contact.objects.all()
	serializer_class= ContactSerializer

