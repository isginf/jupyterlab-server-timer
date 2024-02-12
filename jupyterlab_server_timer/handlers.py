import json
from datetime import datetime

from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
import tornado

start_time = datetime.now()

class RouteHandler(APIHandler):
    @tornado.web.authenticated
    def get(self):
        self.finish(json.dumps({
            "comment": "Server life span.",
            "server-start": int(start_time.timestamp())
        }))

def setup_handlers(web_app):
    host_pattern = ".*$"
    base_url = web_app.settings["base_url"]
    route_pattern = url_path_join(base_url, "jupyterlab-server-timer", "get-life-span")
    handlers = [(route_pattern, RouteHandler)]
    web_app.add_handlers(host_pattern, handlers)
