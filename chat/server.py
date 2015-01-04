from tornado import ioloop, web,websocket

class MainHandler(web.RequestHandler):
	def get(self):
		if self.current_user is not None:
			print "Logueado: " + self.current_user
		else:
			print "Logueado: Anonymous"
		self.render('templates/index.html')


class ChatSocketHandler(websocket.WebSocketHandler):
	def open(self):
		print "Abierto"

	def on_message(self,message):
		self.write_message(u'Dijiste esto: ' + message)

	def on_close(self):
		print "Websocket se ha cerrado"
'''
class StaticHandler(web.WebSocketHandler):
	def open 
'''
if __name__ == "__main__":
	application = web.Application([
		(r"/",MainHandler),
		(r"/static/(.*)", web.StaticFileHandler, {"path": "static/"}),
		(r"/websocket",ChatSocketHandler)
		])
	application.listen(8001)
	ioloop.IOLoop.instance().start() 