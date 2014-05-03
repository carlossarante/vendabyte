from django.shortcuts import render
from articles.models import Article

def home(request):
	articles = Article.objects.all().order_by('date_posted')
	return render(request,'index.html',{'articles':articles})
	
