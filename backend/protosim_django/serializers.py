from rest_framework import serializers
# from .models import Heartbeat_Message
from .models import Message
class ProtosimSerializer(serializers.ModelSerializer):
    class Meta:
        # model = Heartbeat_Message
        # fields = ["m_type","autopilot","state","planemode","armed","manual","stabilized","guided","auto","test"]
        model = Message
        fields = ["timestamp","message","direction","hexdata","messageData"]