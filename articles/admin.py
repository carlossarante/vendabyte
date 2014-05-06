from django.contrib import admin
from .models import Article,BrandModel,Brand,Device

admin.site.register(Article)
admin.site.register(Brand)
admin.site.register(BrandModel)
admin.site.register(Device)
#admin.site.register()
# Register your models here.
