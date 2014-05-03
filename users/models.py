from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from geographics.models import Province,City
from .managers import UserManager



class Badgets(models.Model):
	medal_name = models.CharField(max_length=255)
	medal_icon = models.ImageField(upload_to='badget_icons')


class User(AbstractBaseUser):
	first_name = models.CharField(max_length=255)
	last_name = models.CharField(max_length=255)
	birthday = models.DateField()
	username = models.CharField(max_length=255,unique=True)
	email = models.EmailField()
	photo = models.ImageField(upload_to='users',blank=True)
	cover = models.ImageField(upload_to='cover',blank=True)
	city = models.ForeignKey(City,blank=True)
	rating = models.DecimalField(default = 0.0,decimal_places=1,max_digits=2)
	medals = models.ManyToManyField(Badgets,related_name='medals',blank=True)
	following = models.ManyToManyField('self', related_name='follows', symmetrical=False,blank=True)
	
	objects = UserManager()
	USERNAME_FIELD='username'
	REQUIRED_FIELDS=['first_name','last_name','birthday','email',]
	is_active = models.BooleanField(default=False)
	is_admin = models.BooleanField(default=False)

	def __unicode__(self):
		return (('%s %s') % (self.first_name,self.last_name))
	def get_full_name(self):
		return ('%s %s') % (self.first_name,self.last_name)
	def get_short_name(self):
		return self.first_name
	def has_perm(self, perm, obj=None):
		return True
	def has_module_perms(self, app_label):
		return True
	@property
   	def is_staff(self):
   		return self.is_admin

class Contact(models.Model):
	user = models.OneToOneField(User)
	email = models.EmailField()
	mobile_phone = models.BigIntegerField()
