import jinja2
import logging
import os
import webapp2

jinja_env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

class ServerPage(webapp2.RequestHandler):
    def get(self):
        print 'getting file'
        hello = jinja_env.get_template('server/hello.html')
        self.response.headers['Content-Type'] = 'text/html'
        self.response.write(hello.render())

app = webapp2.WSGIApplication([
    ('/server', ServerPage),
], debug=True)