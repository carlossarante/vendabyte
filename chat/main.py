from tornado import ioloop, web

class MainHandler(web.RequestHandler):
	def get(self):
		self.write('Hello Conuco! Sent by Tornado')

if __name__ == "__main__":
	application = web.Application([
		(r'/',MainHandler)])
	application.listen(8001)
	ioloop.IOLoop.instance().start()