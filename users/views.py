# -*- encoding: utf-8 -*-

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action,link

from django.shortcuts import render, HttpResponseRedirect,HttpResponse,get_object_or_404,redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.conf import settings
from django.db.models import Count


from users.models import User,Badgets,Contact
from users.serializers import UserSerializer,BadgetSerializer,ContactSerializer


def userIndex(request,username=None):
	if username is not None:
		user = get_object_or_404(User,username=username)
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
				return HttpResponse('/%s'% user.username)
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
	def get_queryset(self):
		try:
			requested_query = self.request.GET['list'] 
			user = self.request.user
			if requested_query == 'followers':
				queryset = user.followers.all()
			elif requested_query == 'following':
				queryset = user.follows.all()
			elif requested_query == 'me':
				queryset = [self.request.user,]
		except: 
			queryset = User.objects.all()
		return queryset
	
	def dispatch(self, request, *args, **kwargs):
		if kwargs.get('pk') == 'me' and request.user:
			kwargs['pk'] = request.user.pk
		return super(UserSet, self).dispatch(request, *args, **kwargs)

	@action(methods=['POST',])
	def add_follower(self,request,pk=None):
		try:
			user = self.get_object() #get the requested user.
			user.followers.add(self.request.user) #add current user as follower
			return Response({'Success':'True'})
		except:
			 return Response({'status':'Error doing this query.'},status=status.HTTP_400_BAD_REQUEST)
	@action(methods=['DELETE',])
	def remove_follower(self,request,pk=None):
		try:
			user = self.get_object()
			follow = user.followers.remove(self.request.user)
			return Response({'Success':'True'})
		except:
			 return Response({'status':'Error doing this query.'},status=status.HTTP_400_BAD_REQUEST)

class BadgetSet(viewsets.ReadOnlyModelViewSet):
	queryset = Badgets.objects.all()
	serializer_class = BadgetSerializer

class ContactSet(viewsets.ModelViewSet):
	queryset= Contact.objects.all()
	serializer_class= ContactSerializer