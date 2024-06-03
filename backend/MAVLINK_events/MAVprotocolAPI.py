from MAVLINK_events import pyDLL_MAV

mav = pyDLL_MAV.mavAPI()


class MessageID:
    HEARTBEAT = 0,
    SET_MODE = 11,
    GPS_RAW_INT = 24,
    ATTITUDE = 30,


class MAVMessages:
    GPS_RAW_INT = "gps_raw_int"


# def init_MAV_manager_events():
#     """
#     For events without live comm,
#     only parsing messages through .txt file.
#     """
#     mav.set_manager_events()
#     return


def init_gcs(port_num):
    return mav.init_gcs(port_num)


def init_uav(port_num):
    return mav.init_uav(port_num)


def close():
    return mav.close()


def set_GCS_msg_event():
    print(mav.set_GCS_msg_event())


def set_UAV_msg_event():
    print(mav.set_UAV_msg_event())


def register_event_callback(message_id, callback_func):
    print(message_id)
    return print(mav.register_event_callback(message_id, callback_func))


def send_read_message(s_time, n_message_to_load_byte_array, size, n_direction):
    """
    At this function we are going to read message using load msg function with the specific AVCommManager.
    :param s_time: Time stamp
    :param n_message_to_load_byte_array: the actual text.
    :param size: Message's size
    :param n_direction: Message's direction.
    :return:
    """
    if n_direction == "U":
        pass
    nrc = mav.read_message(s_time, n_message_to_load_byte_array, size, n_direction)
    return nrc


# UAV send functions
def send_attitude(roll, pitch, yaw, roll_speed, pitch_speed, yaw_speed):
    var = mav.send_attitude(roll, pitch, yaw, roll_speed, pitch_speed, yaw_speed)
    print(var)


def send_gps_raw_int(fix_type, lat, lon, alt, eph, epv, velocity, cog, satellites_visible, timestamp):
    mav.send_gps_raw_int(fix_type, lat, lon, alt, eph, epv, velocity, cog, satellites_visible, timestamp)


def send_heartbeat(mode, p_type, autopilot, mode_flag, state):
    mav.send_heartbeat(mode, p_type, autopilot, mode_flag, state)


# GCS send functions
def send_set_mode(mav_mode, custom_mode):
    mav.send_set_mode(mav_mode, custom_mode)


def send_param_set(p_id, f_value, p_type):
    mav.send_param_set(p_id, f_value, p_type)
