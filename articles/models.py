# -*- encoding: utf-8 -*-

from django.db import models
from django.utils import timezone
from users.models import User
from django.utils.encoding import smart_text


class Device(models.Model):
	device_detail = models.CharField(max_length=30)
	def __unicode__(self):
		return self.device_detail

class Brand(models.Model):
	brand = models.CharField(max_length=255)
	device = models.ForeignKey(Device)
	def __unicode__(self):
		return self.brand

class BrandModel(models.Model):
	brand = models.ForeignKey(Brand)
	model_name = models.CharField(max_length=255)
	def __unicode__(self):
		return self.model_name

class Article(models.Model):
	model = models.ForeignKey(BrandModel)
	user = models.ForeignKey(User)
	short_description = models.CharField(max_length=140)
	price = models.DecimalField(decimal_places=2,max_digits=10)
	specs = models.TextField()
	date_posted = models.DateTimeField(default=timezone.now)
	selled = models.BooleanField(default=False)
	is_date_expired = models.BooleanField(default = False)


	def __unicode__(self):
		return (('%s by %s') % (self.model.model_name,smart_text(self.user.email)))

	def like_count(self):
		return self.like_set.all().count()

	def interested_count(self):
		return self.interested_set.all().count()

class ArticlePicture(models.Model):
	article = models.ForeignKey(Article)
	art_img = models.ImageField(upload_to='article_pictures')
	cover = models.BooleanField(default=False)

class Comment(models.Model):
	article = models.ForeignKey(Article)
	date_posted = models.DateTimeField(default=timezone.now)
	user = models.ForeignKey(User)
	comment = models.TextField()

class Like(models.Model):
	article = models.ForeignKey(Article)
	user = models.ForeignKey(User)
	def __unicode__(self):
		return (('%s %s')% (self.article,smart_text(self.user)))

class Interested(models.Model):
	article = models.ForeignKey(Article)
	user = models.ForeignKey(User)
