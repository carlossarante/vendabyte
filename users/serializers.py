import json


def serializeUser(queryset):
	data = []
	for user in queryset:
		array = {
			'id': user.id,
			'username':user.username,
			'first_name':user.first_name,
			'last_name':user.last_name,
			'birthday':('%s/%s/%s') % (user.birthday.year,user.birthday.month,user.birthday.day),
			#'photo':user.photo.url,
			#'cover':user.cover.url,
			'city':user.city.city_name,
			#'medals':serializeMedals(user.medals.all()),
			#'following': serializeFollowers(user.follows.all()),
		}	
		data.append(array)
	return json.dumps(data)

def serializeFollowers(queryset):
	data = []
	for follower in queryset:
		f = {
			'id': follower.id,
			'username': follower.username,
			'name': ('%s %s' % (follower.first_name,follower.last_name)),
		}
		data.append(f)
	return json.dumps(data)


def serializeMedals(queryset):
	data = []
	for medal in queryset:
		array = {
			'id':medal.id,
			'medal_name':medal.medal.name,
			'medal_icon':medal.medal_icon.url,
		}
		data.append(data)
	return json.dumps(data)




