from django.forms.extras.widgets import Select
from django import forms
from .models import Article,ArticlePicture, Brand,BrandModel,Device

class ArticleForm(forms.ModelForm):
	device = forms.ModelChoiceField(queryset=Device.objects.all(),label='Dispositivo',widget=forms.RadioSelect)
	brand = forms.CharField(widget=Select,label = 'Marca')
	specs = forms.CharField(widget=forms.Textarea,label='Detalles del Dispositivo')
	model = forms.CharField(widget=Select,label='Modelo')
	short_description = forms.CharField(label='Mensaje Personal')
	class Meta:
		model = Article
		fields = ['device','brand','model','price','short_description','specs']
		exclude=['date_posted','user','selled','is_date_expired']
