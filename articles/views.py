from django.shortcuts import render
from rest_framework import viewsets
from .models import Article

class ArticleView(viewsets.ModelViewSet):
	model = Article
# Create your views here.
