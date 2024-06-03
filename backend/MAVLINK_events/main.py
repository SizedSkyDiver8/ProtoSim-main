import time

import MAVprotocolAPI
import MAVprotocolAPI as MAV

DJANGO_PROJECT_DIR = 'C:/Users/barsh/Desktop/Study/Third Year/Semester A/Mobile Applications Development/course-repo/BlueBird_ProtoSim/backend'
sys.path.append(DJANGO_PROJECT_DIR)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'protosim_django.settings')
django.setup()
# Now you can import your Django modules
from protosim_django.models import Message
from protosim_django.signals import send_message_update  # Import the signal handler from signals.py
def callback_func(gps_raw_int_data: dict[str, any], message_id: int, bytes: bytes, direction: str):
    _, _, _ = message_id, bytes, direction
    print(gps_raw_int_data)


# sending messages from UAV to GCS/ receiving messages from GCS
# print(MAV.init_uav(70))
# MAV.set_UAV_msg_event()  # Registering eventHandlerMAVWrapper to m_cMessageEvent for receiving msgs from UAV.
# MAV.register_event_callback(11, callback_func)  # Registering callback_func to the boost callback object.


# sending messages from GCS to UAV/ receiving messages from UAV
print(MAV.init_gcs(60))
MAV.set_GCS_msg_event()  # Registering eventHandlerMAVWrapper to m_cMessageEvent for receiving msgs from GCS.

MAV.register_event_callback(24, callback_func)  # Registering callback_func to the boost callback object.
MAV.register_event_callback(30, callback_func)  # Registering callback_func to the boost callback object.
MAV.register_event_callback(0, callback_func)  # Registering callback_func to the boost callback object.

while True:
    time.sleep(1)
    # MAV.send_attitude(1, 10, 20, 30, 40, 50)
    MAV.send_set_mode('A', 4)

