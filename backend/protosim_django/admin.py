from django.contrib import admin
from .models import Heartbeat_Message
from .models import Message

admin.site.register(Heartbeat_Message)
admin.site.register(Message)