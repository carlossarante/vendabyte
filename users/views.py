# -*- encoding: utf-8 -*-

from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.decorators import detail_route

from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, HttpResponseRedirect,HttpResponse,get_object_or_404,redirect
from django.contrib.auth import authenticate, login,logout
from django.conf import settings
from django.db.models import Count,Q

from tasks import getUserPictures
from users.serializers import UserSerializer,BadgetSerializer,ContactSerializer
from users.models import User,Badgets,Contact


def userIndex(request,username=None):
	if request.user.is_anonymous():
		return HttpResponseRedirect('/')
	if username is not None:
		user = get_object_or_404(User,username=username)
	return render(request,'user.html')

@csrf_exempt
def checkUserExistence(request):
	try:
		username = request.POST['username']
		u = User.objects.get(username=username)
		return HttpResponse('Usuario ya está registrado',status=409)
	except User.DoesNotExist:
		return HttpResponse('Disponible',status=200)


def logout_me(request):
	try:
		logout(request)
		return HttpResponse('Good bye! Come back soon!',status=200)
	except:
		return HttpResponse('Error, try again later',status=500)


@csrf_exempt
def loginFacebookUser(request,response='html'):
	if request.method == 'POST': 
		email = request.POST['email']
		facebook_uid = request.POST['facebook_uid']
		user = authenticate(email=email,facebook_uid=facebook_uid)
		if user is not None:
			if user.is_active:
				login(request,user)
				return HttpResponse('/users/%s'% user.username)
			else:
 				return HttpResponse('User is not active')
		else:
 			 	try: 
 			 		User.objects.get(email=email)
 			 		return HttpResponse('Wrong Password')
 			 	except User.DoesNotExist:
 			 		return HttpResponse('User NOT FOUND',status=404)


class UserSet(viewsets.ModelViewSet):
	serializer_class = UserSerializer
	parser_classes = (MultiPartParser,FormParser)
	def get_queryset(self):
		try:
			requested_query = self.request.GET['list'] 
			user = self.request.user
			if requested_query == 'followers':
				queryset = user.followers.all()
			elif requested_query == 'following':
				queryset = user.follows.all()
			else:
				queryset = [self.request.user,]
		except: 
			queryset = User.objects.all()
		return queryset
	

	def create(self,request):
		serializer = UserSerializer(data=request.DATA,context={'request':request})
		if serializer.is_valid():
			u = serializer.save()
			u.set_enc_password()
			u.save()
			loginFacebookUser(request)
			return HttpResponse('/users/%s'%serializer.data['username']) #Retorna la url del usuario.
		else:
			return HttpResponse('Errors: %s' % serializer.errors,status=status.HTTP_400_BAD_REQUEST)
		

	def dispatch(self, request, *args, **kwargs):
		if kwargs.get('pk') == 'me' and request.user:
			kwargs['pk'] = request.user.pk
		return super(UserSet, self).dispatch(request, *args, **kwargs)
	
	@detail_route(methods=['POST',])
	def add_follower(self,request,pk=None):
		try:
			user = self.get_object() #get the requested user.
			user.followers.add(self.request.user) #add current user as follower
			return Response({'Success':'True'})
		except:
			 return Response({'status':'Error doing this query.'},status=status.HTTP_400_BAD_REQUEST)
	@detail_route(methods=['DELETE',])
	def remove_follower(self,request,pk=None):
		try:
			user = self.get_object()
			follow = user.followers.remove(self.request.user)
			return Response({'Success':'True'})
		except:
			 return Response({'status':'Error doing this query.'},status=status.HTTP_400_BAD_REQUEST)


class BadgetSet(viewsets.ReadOnlyModelViewSet):
	queryset = Badgets.objects.all()
	permission_classes = (IsAuthenticatedOrReadOnly,)
	serializer_class = BadgetSerializer

class ContactSet(viewsets.ModelViewSet):
	queryset= Contact.objects.all()
	permission_classes = (IsAuthenticatedOrReadOnly,)
	serializer_class= ContactSerializer
