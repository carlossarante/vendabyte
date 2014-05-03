from django.db import models

# Create your models here.

class Province(models.Model):
	province_name = models.CharField(max_length=255)

	def __unicode__(self):
		return self.province_name

class City(models.Model):
	province = models.ForeignKey(Province)
	city_name = models.CharField(max_length = 255)
	
	def __unicode__(self):
		return self.city_name