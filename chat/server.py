from tornado import ioloop, web,websocket

class MainHandler(web.RequestHandler):
	def get(self):
		self.write('Hello Conuco! Sent by Tornado')

class ChatSocketHandler(websocket.WebSocketHandler):
	def open(self):
		print "Abierto"

	def on_message(self,message):
		self.write_message(u'Dijiste esto: ' + message)

	def on_close(self):
		print "Websocket se ha cerrado"

if __name__ == "__main__":
	application = web.Application([
		(r'/',MainHandler),
		(r'/websocket',ChatSocketHandler)
		])
	application.listen(8001)
	ioloop.IOLoop.instance().start()
