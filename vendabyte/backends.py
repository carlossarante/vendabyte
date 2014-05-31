from django.conf import settings
from users.models import User


class EmailBackend(object):
	def authenticate(self,email=None, facebook_uid=None):
		try:
			user = User.objects.get(email = email)
			if user.check_password('%s%s%s'%(user.id,user.facebook_uid,settings.SALT)):
				return user
		except User.DoesNotExist: 
			return None

	def get_user(self,user_id):
		try:
			return User.objects.get(id=user_id)
		except User.DoesNotExist:
			return None