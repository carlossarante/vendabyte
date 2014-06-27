# -*- encoding: utf-8 -*-

from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.decorators import action,link

from django.shortcuts import render, HttpResponseRedirect,HttpResponse,get_object_or_404,redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login,logout
from django.conf import settings
from django.db.models import Count,Q


from users.models import User,Badgets,Contact
from users.serializers import UserSerializer,BadgetSerializer,ContactSerializer


def userIndex(request,id_user=None):
	if request.user.is_anonymous():
		return HttpResponseRedirect('/')
	if id_user is not None:
		user = get_object_or_404(User,id=id_user)
	return render(request,'user.html')


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
			elif requested_query == 'interested':
				queryset = user.interested_set.all()
			else:
				queryset = [self.request.user,]
		except: 
			queryset = User.objects.all()
		return queryset
	

	def create(self,request):
		serializer = UserSerializer(data=request.DATA,files=request.FILES,context={'request':request})
		if serializer.is_valid():
			serializer.save()
			u = User.objects.get(id = serializer.data['id'])
			u.set_enc_password()
			u.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)		


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
