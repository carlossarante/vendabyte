from django.db import models
from django.contrib.auth.models import AbstractUser
from geographics.models import Province,City
# Create your models here.



class User(AbstractUser):
	birthday = models.DateField()
	photo = models.ImageField(upload_to='users')
	cover = models.ImageField(upload_to='cover')
	city = models.ForeignKey(City)
	rating = models.DecimalField(default = 0.0)
	medals = models.ManyToManyField(Badgets,related_name='medals',blank=True)
	follows = models.ManyToManyField('self', related_name='follows', symmetrical=False)


class Contact(models.Model):
	user = models.OneToOneField(User)
	email = models.EmailField()
	mobile_phone = models.BigIntegerField()


class Badgets(models.Model):
	medal_name = models.CharField(max_length=255)
	medal_icon = models.ImageField(upload_to='badget_icons')