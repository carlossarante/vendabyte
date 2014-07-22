from django.utils import timezone
from django.db import models
from django.db.models import Avg
from django.contrib.auth.models import AbstractBaseUser
from django.conf import settings

from geographics.models import Province,City

from .managers import UserManager


class Badgets(models.Model):
	medal_name = models.CharField(max_length=255)
	medal_icon = models.ImageField(upload_to='badget_icons')

class User(AbstractBaseUser):
	first_name = models.CharField(max_length=255)
	last_name = models.CharField(max_length=255)
	birthday = models.DateField(default=timezone.now(),null=True)
	email = models.EmailField(unique=True)
	photo = models.ImageField(upload_to='users',blank=True)
	cover = models.ImageField(upload_to='cover',blank=True)
	city = models.ForeignKey(City,default=1)
	username = models.CharField(max_length=255,unique=True)
	medals = models.ManyToManyField(Badgets,related_name='medals',blank=True)
	followers = models.ManyToManyField('self', related_name='follows', symmetrical=False,blank=True)
	sex = models.CharField(max_length=10,null=True)
	date_joined = models.DateTimeField(default=timezone.now)
	objects = UserManager()
	USERNAME_FIELD='username'
	REQUIRED_FIELDS=['first_name','last_name','birthday','email']
	is_active = models.BooleanField(default=True)
	is_admin = models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False)
	facebook_uid= models.PositiveIntegerField(blank=True,default=0)
	
	def __unicode__(self):
		return (('%s %s (%s)') % (self.first_name,self.last_name,self.email))
	
	def get_absolute_url(self):
		return ('/users/%s/') % self.id
	def get_full_name(self):
		return ('%s %s') % (self.first_name,self.last_name)
	def get_short_name(self):
		return self.first_name
	def has_perm(self, perm, obj=None):
		return True
	def has_module_perms(self, app_label):
		return True
	def set_enc_password(self):
		return self.set_password(('%s%s%s') % (self.id,self.facebook_uid,settings.SALT))
	def average_rating(self):
		return self.rating_set.aggregate(Avg('stars'))

	@property
	def is_staff(self):
   		return self.is_admin

class Contact(models.Model):
	user = models.OneToOneField(User)
	email = models.EmailField()
	mobile_phone = models.BigIntegerField()

class Rating(models.Model):
	user_rated = models.ForeignKey(User)
	rating_user = models.ForeignKey(User,related_name='rating_user')
	stars = models.DecimalField(decimal_places=1,max_digits=3)
