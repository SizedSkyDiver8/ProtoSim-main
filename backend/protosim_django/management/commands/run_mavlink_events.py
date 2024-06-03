from django.core.management.base import BaseCommand
import time
import os
import sys
from MAVLINK_events import MAVprotocolAPI as MAV
from MAVLINK_events import pyDLL_MAV
from protosim_django.models import Message
import json

class Command(BaseCommand):
    help = 'Script to trigger updates via WebSocket using Django Channels'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Initializing GCS with MAV protocol'))
        print(MAV.init_gcs(60))
        MAV.set_GCS_msg_event()  # Registering eventHandlerMAVWrapper to m_cMessageEvent for receiving msgs from GCS.

        # Registering callback functions to the boost callback object
        MAV.register_event_callback(24, self.callback_func) # GPS_RAW_INT
        MAV.register_event_callback(30, self.callback_func) # ATTITUDE
        MAV.register_event_callback(0, self.callback_func) # HEARTBEAT

        # sending messages from UAV to GCS/ receiving messages from GCS
        # print(MAV.init_uav(70))
        # MAV.set_UAV_msg_event()  # Registering eventHandlerMAVWrapper to m_cMessageEvent for receiving msgs from UAV.
        # MAV.register_event_callback(11, self.callback_func)  # SET_MODE, Registering callback_func to the boost callback object.

        self.stdout.write(self.style.SUCCESS('Entering the loop to listen for MAV messages...'))
        while True:
            time.sleep(1)
            # MAV.send_set_mode('A', 4)
            # MAV.send_attitude(1, 10, 20, 30, 40, 50)


            # Here, you would have the logic to send attitudes or other messages if needed.

    def callback_func(self, gps_raw_int_data: dict[str, any], message_id: int, bytes: bytes, direction: str):
        _, _, _ = message_id, bytes, direction  # If these are not used, consider removing them.
        self.stdout.write(f"Received GPS RAW INT data: {gps_raw_int_data}")
        hex_string = bytes.hex()
        spaced_hex_string = ' '.join(hex_string[i:i+2] for i in range(0, len(hex_string), 2))
        Message.objects.create(message=str(message_id), hexdata=spaced_hex_string.upper(), direction=str(direction),messageData=str(json.dumps(gps_raw_int_data)))
