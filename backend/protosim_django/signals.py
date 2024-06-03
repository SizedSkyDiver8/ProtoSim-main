# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Message
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .consumers import MessageConsumer
from .serializers import ProtosimSerializer
from datetime import datetime
from django.utils import timezone

channel_layer = get_channel_layer()

# @receiver(post_save, sender=Message)
# def send_message_update(sender, instance, **kwargs):
#     # Trigger the WebSocket consumer to send updates
#     data = ProtosimSerializer(instance).data
#     async_to_sync(channel_layer.group_send)(
#         'client-server-communication',
#         {
#             'type': 'send.update',
#             'message': data,
#         }
#     )
#     print('Signal triggered: New message added')
#     print(data)

# @receiver(post_save, sender=Message)
# def send_message_update(sender, instance, **kwargs):
#     from .serializers import ProtosimSerializer
#     print("DID TRIGGER")
#     print(instance)
#     message_timestamp = instance.timestamp
    
#     # if message_timestamp > MessageConsumer.last_update:
#     messages = Message.objects.all()
#     data = ProtosimSerializer(messages, many=True).data
#     async_to_sync(channel_layer.group_send)(
#         'client-server-communication',
#         {
#             'type': 'send.update',
#             'message': data,
#         }
#     )
#         # MessageConsumer.last_update = timezone.now() 

@receiver(post_save, sender=Message)
def send_message_update(sender, instance, **kwargs):
    from .serializers import ProtosimSerializer
    print("DID TRIGGER")
    print(instance)
    message_timestamp = instance.timestamp
    
    if message_timestamp > MessageConsumer.last_update:
        messages = Message.objects.filter(timestamp__gt=MessageConsumer.last_update)
        data = ProtosimSerializer(messages, many=True).data
        async_to_sync(channel_layer.group_send)(
            'client-server-communication',
            {
                'type': 'send.update',
                'message': data,
            }
        )
        MessageConsumer.last_update = timezone.now() 