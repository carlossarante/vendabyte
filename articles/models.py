from django.db import models
from django.utils import timezone
from users.models import User
# Create your models here.



class Brands(models.Model):
	brand = models.CharField(max_length=255)

class BrandModels(models.Model):
	brand = models.ForeignKey(Brands)
	model_name = models.CharField(max_length=255)


class Articles(models.Model):
	user = models.ForeignKey(User)
	price = models.DecimalField()
	specs = models.TextField()
	date_posted = models.DateTimeField(default=timezone.now)
	selled = models.BooleanField(default=False)

class ArticlePictures(models.Model):
	article = models.ForeignKey(Articles)
	art_img = models.ImageField(upload_to='article_pictures')
	cover = models.BooleanField(default=False)