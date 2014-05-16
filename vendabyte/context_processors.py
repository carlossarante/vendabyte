def getCurrentUser(request):
	return {'user':request.user}