from tornado import ioloop, web,websocket

clients = []
counter = 0

class MainHandler(web.RequestHandler):
	def get(self):
		if self.current_user is not None:
			print "Logueado: " + self.current_user
		else:
			print "Logueado: Anonymous"
		self.render('templates/index.html')


class ChatSocketHandler(websocket.WebSocketHandler):
	counter = 0
	def open(self):
		print "Abierto"
		clients.append(self)
		counter+=1

	def on_message(self,message):
		structure_message = u"user%s said: %s"%(self.counter,message)
		print structure_message 
		for c in clients:
			c.write_message(structure_message)

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