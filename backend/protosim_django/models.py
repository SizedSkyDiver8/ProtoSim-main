from django.db import models
from channels.layers import get_channel_layer
from django.dispatch import receiver
from asgiref.sync import async_to_sync
from .consumers import MessageConsumer
from datetime import datetime
from django.utils import timezone
from django.db.models.signals import post_save

class Heartbeat_Message(models.Model):
    m_type = models.CharField(max_length=50) 
    autopilot = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    planemode = models.CharField(max_length=50)
    armed = models.BooleanField(default=False)
    manual = models.BooleanField(default=False)
    stabilized = models.BooleanField(default=False)
    guided = models.BooleanField(default=False)
    auto = models.BooleanField(default=False)
    test = models.BooleanField(default=False)

    def __str__(self):
        return self.m_type + " " + self.autopilot + " " + self.state + " " + self.planemode

class Message(models.Model):
    # timestamp = models.CharField(max_length=50) 
    # timestamp = models.TimeField(auto_now_add=True)  # Use auto_now_add to automatically set the timestamp on creation
    timestamp = models.DateTimeField(auto_now_add=True)  # Use auto_now_add to automatically set the timestamp on creation
    message = models.CharField(max_length=50)
    direction = models.CharField(max_length=50)
    hexdata = models.CharField(max_length=500)
    messageData = models.CharField(max_length=1500)

    def __str__(self):
        return str(self.timestamp) + "," + self.message + "," + self.direction + " ," + self.hexdata + " ," + self.messageData

    

channel_layer = get_channel_layer()

# @receiver(post_save, sender=Message)
# def send_message_update(sender, instance, **kwargs):
#     from .serializers import ProtosimSerializer
#     # Trigger the WebSocket consumer to send updates
#     print('Signal triggered: New message added')
#     messages = Message.objects.all()
#     data = ProtosimSerializer(messages, many=True).data
#     async_to_sync(channel_layer.group_send)(
#         'client-server-communication',
#         {
#             'type': 'send.update',
#             'message': data,
#         }
#     )

# @receiver(post_save, sender=Message)
# def send_message_update(sender, instance, **kwargs):
#     from .serializers import ProtosimSerializer
#     print("DID TRIGGER")
#     print(instance)
#     message_timestamp = instance.timestamp
    
#     if message_timestamp > MessageConsumer.last_update:
#         messages = Message.objects.filter(timestamp__gt=MessageConsumer.last_update)
#         data = ProtosimSerializer(messages, many=True).data
#         async_to_sync(channel_layer.group_send)(
#             'client-server-communication',
#             {
#                 'type': 'send.update',
#                 'message': data,
#             }
#         )
#         MessageConsumer.last_update = timezone.now() 