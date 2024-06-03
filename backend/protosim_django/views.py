from django.http import JsonResponse
from .models import Message
from .serializers import ProtosimSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

channel_layer = get_channel_layer()

@api_view(['GET','POST'])
def messages_list(request):
    if request.method == 'GET':
        messages = Message.objects.all()
        serializers = ProtosimSerializer(messages, many = True)
        return JsonResponse(serializers.data,status = status.HTTP_200_OK, safe = False)
    if request.method == 'POST':
        serializers = ProtosimSerializer(data = request.data)
        if serializers.is_valid():
            serializers.save()
            async_to_sync(channel_layer.group_send)(
                'client-server-communication',
                {
                    'type': 'send_update',
                    'message': 'Data updated',
                }
            )
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

# def lobby(request):
#     return render(request,"")
def message_view(request):
    if request.method == 'POST':
        async_to_sync(channel_layer.group_send)(
            'client-server-communication',
            {
                'type': 'send_update',
                'message': 'Data updated',
            }
        )  
        return JsonResponse({'status': 'success'})