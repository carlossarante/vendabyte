from django.db import models
from django.utils import timezone
from users.models import User
# Create your models here.



class Brand(models.Model):
	brand = models.CharField(max_length=255)

class BrandModel(models.Model):
	brand = models.ForeignKey(Brand)
	model_name = models.CharField(max_length=255)

class Article(models.Model):
	user = models.ForeignKey(User)
	price = models.DecimalField(decimal_places=2,max_digits=7)
	specs = models.TextField()
	date_posted = models.DateTimeField(default=timezone.now)
	selled = models.BooleanField(default=False)

class ArticlePicture(models.Model):
	article = models.ForeignKey(Article)
	art_img = models.ImageField(upload_to='article_pictures')
	cover = models.BooleanField(default=False)

class Comment(models.Model):
	article = models.ForeignKey(Article)
	user = models.ForeignKey(User)
	comment = models.TextField()

class Like(object):
	article = models.ForeignKey(Article)
	user = models.ForeignKey(User)
		
class Interested(models.Model):
	article = models.ForeignKey(Article)
	user = models.ForeignKey(User)
