from django.db import models

# Create your models here.

class Province(models.Model):
	province_name = models.Charfield(max_length=255)

class City(models.Model):
	province = models.ForeignKey(Province)
	city_name = models.Charfield(max_length = 255)
