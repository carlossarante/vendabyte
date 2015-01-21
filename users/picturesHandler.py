from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile,SimpleUploadedFile
import base64,re,uuid
from StringIO import StringIO

def get_a_uuid():
    return str(uuid.uuid4())

def datauriToUploadedFile(data_url):
	imgstr = re.sub(r'data:image/\b(png|jpeg|bmp|jpg)\b;base64,',"",data_url) #data:image/format;base64
	picture = StringIO(base64.b64decode(imgstr))
	thumb_file = InMemoryUploadedFile(picture, None, ('%s.png') % get_a_uuid(), 'image/png',picture.len, None)
	return thumb_file
