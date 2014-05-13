# -*- encoding: utf-8 -*-
from django.shortcuts import render, HttpResponse,HttpResponseRedirect
from django.http import StreamingHttpResponse
from django.db.models import Count
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.decorators import login_required
from articles.forms import ArticleForm
from articles.models import Article,ArticlePicture,Interested,Like,BrandModel,Brand,Device
from articles.serializers import serializeArticle,serializeDevice,serializeBrands,serializeBrandModels

#articles/new/ Renderiza los últimos posts usando la página articleblock.html en la variable articles, seguido del grupo a renderizar. 
#Default: /articles/new/1 

#Retorna la instancia de un objeto de dispositivo.
def getDeviceInstance(device):
	instance = Device.objects.get(device_detail__iexact=device)
	return device_instance
#Retorna la instancia de un objecto de marca.
def getBrandInstance(brand):
	instance = Brand.objects.get(brand__iexact=brand)
	return instance
#Retorna la instancia de un objecto de modelo.
def getBrandModelInstance(model):
	instance = BrandModel.objects.get_or_create(model_name__iexact=model)
	return instance

def setArticlePictures(request,article_instance):
	article_picture_set = request.FILES.getlist(u'picture_set') #Mandar un arreglo de archivos con esta variable.
	for picture in article_picture_set:
		article_picture = ArticlesPicture(article=article_instance,art_img=picture)
		article_picture.save()
	return article


@login_required
def uploadArticle(request):
	if request.method == 'POST':
		form = ArticleForm(request.POST)
		if form.is_valid():
			article = Article.objects.create(
				user = request.user,
				model = getBrandModelInstance(form.clean_data['model']),
				price = form.clean_data['price'],
				specs = form.clean_data['specs'],
			)
			article.save()
			getArticlePictures(request,article)
			return HttpResponseRedirect('/articles/me')
	else:
		form = ArticleForm
		return render(request,'articleform.html',{'form':form})



	
#Devuelve informacion sobre todos los tipos de dispositivos.
@login_required
def getDevices(request,device=None):
	if device is not None:
		device = Device.objects.filter(device_detail__iexact=device) 
		data = device.values() 
	else:
		device = Device.objects.all()
		data = serializeDevice(device)
	return HttpResponse(data,mimetype='application/json')

#Devuelve informacion sobre todas las marcas disponibles
@login_required
def getBrands(request,brand=None):
	if brand is not None:
		brand = Brand.objects.filter(brand__iexact=brand)
		data = brand.values()
	else:
		brand = Brand.objects.all()
		data = serializeBrands(brand)
	return HttpResponse(data,mimetype='application/json')
#Devuelve informacion sobre todas los modelos disponibles

@login_required
def getModels(request,model=None):
	if model is not None:
		model = BrandModel.objects.filter(model_name__iexact=model)
		data = model.values()
	else:
		model = BrandModel.objects.all()
		data = serializeBrandModels(model)
	return HttpResponse(data,content_type='application/json')


#Devuelve los ultimos articulos subidos.
@login_required
def getNewUploadedArticles(request,group=1,response='html'):
	uploads = Article.objects.all().order_by('date_posted')
	articles = Paginator(uploads, group) 
	if not (response == 'json'):
		return render(request,'articleblock.html',{'articles':articles.object_list})
	else:
		data = serializeArticle(articles.object_list)
		return HttpResponse(data,mimetype='application/json')

#Devuelve los mas populares (segun cantidad de likes), no ha sido testeado.
@login_required
def getMostPopularArticles(request,response='html'):
	most_liked = Like.objects.all().annotate(like_count=Count('article')).order_by('-like_count')[:10]
	articles = []
	for ml in most_liked:
		articles.append(ml.article)
	if not (response == 'json'):
		return render(request,'articleblock.html',{'articles':articles})	
	else:
		data = serializeArticle(articles)
		return HttpResponse(data,mimetype='application/json')

#Devuelve los articulos más interesantes, segun cantidad de me_interesa.
@login_required
def getInterestingArticles(request,response='html'):
	interesting_articles = Interested.objects.filter(user=request.user)
	articles = []
	for ia in interesting_articles:
		articles.append(interesting_articles.ia)
	if not (response == 'json'):
		render(request,'articleblock.html',{'articles':articles})
	else:
		data = serializeArticle(articles)
		return HttpResponse(data,mimetype='application/json')
	
#Devuelve los archivos subidos por el usuario.
@login_required
def getMyArticles(request,response='html'):
	articles = Article.objects.filter(user=request.user)
	if not (response == 'json'):
		return render(request,'articleblock.html',{'articles':articles})
	else:
		data = serializeArticle(articles)
		return HttpResponse(data,mimetype='application/json')


