from celery import task
import urllib2
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile


@task
def getUserPictures(obj,url_photo,url_cover):
	img_temp = NamedTemporaryFile()
	img_temp.write(urllib2.urlopen(url_photo).read())
	img_temp.flush()
	obj.photo.save((('%s%s')%(obj.id,img_temp.name)), File(img_temp))
	img_temp = NamedTemporaryFile()
	img_temp.write(urllib2.urlopen(url_cover).read())
	img_temp.flush()
	obj.cover.save((('%s%s')%(obj.id,img_temp.name)), File(img_temp))		
	return obj