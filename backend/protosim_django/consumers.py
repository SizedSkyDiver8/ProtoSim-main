# consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from django.utils import timezone
import MAVLINK_events.MAVprotocolAPI as MAV
import ctypes


class MessageConsumer(AsyncWebsocketConsumer):
    def callback_func(self, gps_raw_int_data: dict[str, any], message_id: int, bytes: bytes, direction: str):
        from .models import Message
        _, _, _ = message_id, bytes, direction  # If these are not used, consider removing them.
        print(f"Received GPS RAW INT data: {gps_raw_int_data}")
        hex_string = bytes.hex()
        spaced_hex_string = ' '.join(hex_string[i:i+2] for i in range(0, len(hex_string), 2))
        Message.objects.create(message=str(message_id), hexdata=spaced_hex_string.upper(), direction=str(direction),messageData=str(json.dumps(gps_raw_int_data)))

    last_update = timezone.now() # Initialize last_update with the current time
    print(last_update)
    async def connect(self):
        # print(MAV.init_gcs(60))
        # MAV.set_GCS_msg_event()  # Registering eventHandlerMAVWrapper to m_cMessageEvent for receiving msgs from GCS
        # # gistering callback functions to the boost callback object
        # MAV.register_event_callback(24,self.callback_func)
        # MAV.register_event_callback(30,self.callback_func)
        # MAV.register_event_callback(0,self.callback_func)
        # print(MAV.init_uav(70))
        # MAV.set_UAV_msg_event()  # Registering eventHandlerMAVWrapper to m_cMessageEvent for receiving msgs from UAV.
        # MAV.register_event_callback(11, self.callback_func)  # SET_MODE, Registering callback_func to the boost callback object.

        await self.channel_layer.group_add(
        'client-server-communication',
        self.channel_name
        )
        
        await self.accept()
        print("CONNECTED!!!!!!!")
        await self.send(text_data = json.dumps({
            'type': "CONNECTION_ESTABLISHED",
            'message': "SERVER SENT: You are now connected!"
        }))
    async def initialize_gcs(self, port):
        print(MAV.init_gcs(port))
        MAV.set_GCS_msg_event()
        MAV.register_event_callback(24, self.callback_func)
        MAV.register_event_callback(30, self.callback_func)
        MAV.register_event_callback(0, self.callback_func)
        await self.send(json.dumps({
            'message': "GCS Initialized",
            'port': port
        }))

    async def initialize_uav(self,port):
        print(MAV.init_uav(port))
        MAV.set_UAV_msg_event()
        MAV.register_event_callback(11, self.callback_func)
        await self.send(json.dumps({
            'message': "UAV Initialized",
            'port': port
        }))


    async def disconnect(self, close_code):
        print("Disconnected")
        await self.send(text_data = json.dumps({
            'type': "CONNECTION_DISCARD",
            'message': "SERVER SENT: You are now Disconnecting!"
        }))
        await self.channel_layer.group_discard(
            'client-server-communication',
            self.channel_name
        )
        await self.clear_messages_table()  # Clear the table when disconnecting
        await self.send(json.dumps({
            'message': "Table Cleared",

        }))

    """
    a function for recivieng data through the WebSocket. the data type is what we get from the client as part of the JSON.
    so we could know how we should handle it.
    """
    async def receive(self, text_data):
        data = json.loads(text_data)
        if data['type'] == 'ADD_ITEM':
            # Add the new item to the table
            new_item = data['message']
            # Use a sync_to_async function to interact with the database
            await self.add_item_to_table(new_item)
            self.last_update = timezone.now()  # Update last_update timestamp

            await self.send(text_data=json.dumps({
                'type': 'MESSAGE_ADDED',
                'message': 'New message has been added'
            }))
        
        if data['type'] == 'INIT_BOTH':
            # INIT GCS PART
            print(MAV.init_uav(int(data['port1'])))
            print(MAV.init_gcs(int(data['port2'])))
            MAV.set_GCS_msg_event()
            MAV.register_event_callback(24, self.callback_func)
            MAV.register_event_callback(30, self.callback_func)
            MAV.register_event_callback(0, self.callback_func)
            # INIT UAV PART
            MAV.set_UAV_msg_event()
            MAV.register_event_callback(11, self.callback_func)
            await self.send(json.dumps({
            'message': "UAV and GCS Initialized",
            'port1': int(data['port1']),
            'port2': int(data['port2'])
        }))
         # Handling case of GCS initialization   
        if data['type'] == 'INIT_GCS':
            print("Initializing GCS")
            await self.initialize_gcs(int(data['port']))
         # Handling case of UAV initialization   
        elif data['type'] == 'INIT_UAV':
            print("Initializing UAV")
            await self.initialize_uav(int(data['port']))
        if data['type'] == 'SetMode': 
            print(data)
            new_item = data['message']
            mav_mode = new_item['mav_mode']
            custom_mode = new_item['custom_mode']
            # Execute the function that interacts with the DLL
            response = MAV.send_set_mode(mav_mode, custom_mode)
            # send a response back to the client
            await self.send(json.dumps({'status': 'success', 'response': response}))
        if data['type'] == 'ATTITUDE':
            print(data)
            new_item = data['message'] #JSON recieved from client side
            roll = new_item['roll']
            pitch = new_item['pitch']
            yaw = new_item['yaw']
            roll_speed = new_item['roll_speed']
            pitch_speed = new_item['pitch_speed']
            yaw_speed = new_item['yaw_speed']
            # Execute the function that interacts with the DLL
            response = MAV.send_attitude(roll,pitch,yaw,roll_speed,pitch_speed,yaw_speed) # runs the function from the DLL
            # You can send back a response to the client
            await self.send(json.dumps({'status': 'success', 'response': response}))
        if data['type'] == 'GPS_RAW_INT':
            print(data)
            new_item = data['message']
            fixType = new_item['fixType']
            lat = new_item['lat']
            lon = new_item['lon']
            alt = new_item['alt']
            eph = new_item['eph']
            epv = new_item['epv']
            velocity = new_item['velocity']
            courseOverGround = new_item['courseOverGround']
            satellitesVisible = new_item['satellitesVisible']
            gpsTime = new_item['gpsTime']

            MAV.send_gps_raw_int.argtypes = [
                ctypes.c_int, ctypes.c_double, ctypes.c_double, ctypes.c_double, 
                ctypes.c_short, ctypes.c_short, ctypes.c_double, ctypes.c_double, 
                ctypes.c_char, ctypes.c_uint64
            ]
            MAV.send_gps_raw_int.restype = None

            fixType_c = int(fixType)
            lat_c = ctypes.c_double(lat)
            lon_c = ctypes.c_double(lon)
            alt_c = ctypes.c_double(alt)
            eph_c = ctypes.c_short(eph)
            epv_c = ctypes.c_short(epv)
            velocity_c = ctypes.c_double(velocity)
            courseOverGround_c = ctypes.c_double(courseOverGround)
            satellitesVisible_c = ctypes.c_char(bytes([satellitesVisible]))
            gpsTime_c = ctypes.c_uint64(gpsTime)

            response = MAV.send_gps_raw_int(
                fixType_c, lat_c, lon_c, alt_c, eph_c, epv_c, 
                velocity_c, courseOverGround_c, satellitesVisible_c, gpsTime_c
            )

            await self.send(json.dumps({'status': 'success', 'response': response}))
        else:
            pass
    
    """
    function that deals with the table updates. whenver there is a new row in the table, it triggers a signal which will trigger
    this function, and this function will send the messeage to the client.
    the client side as an handler which will get the type 'TABLE_UPDATED' and will know to update the table accordingly
    with the new rows, based on the timestamp (so we won't have duplicate rows).
    """
    async def send_update(self, event):
        message = event['message']
        # Send message to WebSocket with all the messages
        await self.send(text_data=json.dumps({'type': "TABLE_UPDATED",'message': message}))


    #Create a new Message item in the django table.
    @database_sync_to_async
    def add_item_to_table(self, new_item):
        from protosim_django.models import Message

        Message.objects.create(**new_item)
        print("ADD ITEM TO TABLE!!!!!!!")

    @database_sync_to_async
    def clear_messages_table(self):
        from protosim_django.models import Message
        Message.objects.all().delete()
        print("CLEARED MESSAGES TABLE!!!!!!!")