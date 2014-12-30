from django.db import models
from users.models import User
# Create your models here.

class Message(models.Model):
	content = models.TextField(max_length=10000)




class ChatSession(models.Model):
	users = models.ForeignKey(User,related_name='users')
	messages = models.ManyToManyField(Message)
