from rest_framework import serializers
import json
import decimal

class DecimalJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return str(o)
        return super(DecimalJSONEncoder, self).default(o)


def serializeArticle(queryset):
	data = []
	for article in queryset:
		array = {
			'model': article.model.model_name,
			'user': ('%s %s') % (article.user.first_name,article.user.last_name),
			'short_description':article.short_description,
			'price':decimal.Decimal(article.price),
			'specs':article.specs,
			'date_posted':('%s/%s/%s %s:%s') % (article.date_posted.year,article.date_posted.month,article.date_posted.day,article.date_posted.hour,article.date_posted.minute),
			'is_selled':article.selled,
			'is_date_expired':article.is_date_expired,
		}
		data.append(array)
	return json.dumps(data,cls=DecimalJSONEncoder)

def serializeDevices(queryset):
	data = []
	for device in queryset:
		array = {
				'id':device.id,
				'device':device.device_detail,
			}
		data.append(array)
	return json.dumps(data)

def serializeBrands(queryset,to_json=True):
	data = []
	for brand in queryset:
		array = {
			'id':brand.id,
			'brand_detail':brand.brand,
			'models': serializeBrandModels(brand.brandmodel_set.all()),
		}
		data.append(array)
	if to_json: #convert to json?
		return json.dumps(data)
	return data


def serializeBrandModels(queryset):
	data = []
	for model in queryset:
		array = {
			'id':model.id,
			'model_detail': model.model_name,
			'brand':model.brand.brand,
		}
		data.append(array)
	return data

def serializeDevice(queryset):
	data = []
	for device in queryset:
		array = {
			'id':device.id,
			'device_detail': device.device_detail,
			'brandset':serializeBrands(device.brand_set.all()),
		}
		data.append(array)
	return data
