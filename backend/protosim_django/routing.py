from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    # re_path(r'ws/socket-server/$', consumers.MessageConsumer.as_asgi()),
    # re_path(r'ws/socket\.io/$', consumers.MessageConsumer.as_asgi()),
    re_path(r'ws/socket\.io/$', consumers.MessageConsumer.as_asgi()),

]
