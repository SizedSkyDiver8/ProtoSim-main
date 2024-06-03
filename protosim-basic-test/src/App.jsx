import { useEffect, useRef, useState } from "react";
import MessageWrapper from "./Components/MessageWrapper";
import MessagesColumnContainer from "./Components/MessagesColumnContainer";
import MessagesTable from "./Components/Table";
import GlobalPositionMessage from "./Components/GlobalPosition";
import LocalPosition from "./Components/LocalPositionNed";
import Attitude from "./Components/Attitude";
import StatusText from "./Components/StatusText";
import GpsRawInt from "./Components/GpsRawInt";
import VfrHud from "./Components/VfrHud";
import PositionTargetGlobal from "./Components/PositionTargetGlobal";
import AttitudeTarget from "./Components/AttitudeTarget";
import HomePosition from "./Components/HomePosition";
import SelectFieldWithLabel from "./Components/SelectFieldWithLabel";
import CheckBoxesContainer from "./Components/CheckBoxesContainer";
import Checkbox from "./Components/Checkbox";
import SendButtonsContainer from "./Components/SendButtonsContainer";
import TripleSwitch from "./Components/TripleSwitch/TripleSwitch";
import Navbar from "./Components/Navbar";
import {Toaster} from 'react-hot-toast';

import SetMode from "./Components/SetMode";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import WelcomeScreen from "./Components/WelcomeScreen";
import { AppProvider, useBlueBird } from "../contexts/AppContext";
import GcsSide from "./Components/GcsSide";
import UavSide from "./Components/UavSide";
import MainScreen from "./Components/MainScreen";
import BothSides from "./Components/BothSides";
//
// FIELDS FOR SELECT BOXES
let mav_type = [
  { value: 0, field_name: "GENERIC" },
  { value: 1, field_name: "FIXED_WING" },
  { value: 2, field_name: "QUADROTOR" },
  { value: 3, field_name: "COAXIAL" },
  { value: 4, field_name: "HELICOPTER" },
  { value: 5, field_name: "ANTENNA_TRACKER" },
  { value: 6, field_name: "GCS" },
  { value: 7, field_name: "AIRSHIP" },
  { value: 8, field_name: "FREE_BALLOON" },
  { value: 9, field_name: "ROCKET" },
  { value: 10, field_name: "GROUND_ROVER" },
  { value: 11, field_name: "SURFACE_BOAT" },
  { value: 12, field_name: "SUBMARINE" },
  { value: 13, field_name: "HEXAROTOR" },
  { value: 14, field_name: "OCTOROTOR" },
  { value: 15, field_name: "TRICOPTER" },
  { value: 16, field_name: "FLAPPING_WING" },
  { value: 17, field_name: "KITE" },
  { value: 18, field_name: "ONBOARD_CONTROLLER" },
  { value: 19, field_name: "VTOL_TAILSITTER_DUOROTOR" },
  { value: 20, field_name: "VTOL_TAILSITTER_QUADROTOR" },
  { value: 21, field_name: "VTOL_TILTROTOR" },
  { value: 22, field_name: "VTOL_FIXEDROTOR" },
  { value: 23, field_name: "VTOL_TAILSITTER" },
  { value: 24, field_name: "VTOL_TILTWING" },
  { value: 25, field_name: "VTOL_RESERVED5" },
  { value: 26, field_name: "GIMBAL" },
  { value: 27, field_name: "ADSB" },
  { value: 28, field_name: "PARAFOIL" },
  { value: 29, field_name: "DODECAROTOR" },
  { value: 30, field_name: "CAMERA" },
  { value: 31, field_name: "CHARGING_STATION" },
  { value: 32, field_name: "FLARM" },
  { value: 33, field_name: "SERVO" },
  { value: 34, field_name: "ODID" },
  { value: 35, field_name: "DECAROTOR" },
  { value: 36, field_name: "BATTERY" },
  { value: 37, field_name: "PARACHUTE" },
  { value: 38, field_name: "LOG" },
  { value: 39, field_name: "OSD" },
  { value: 40, field_name: "IMU" },
  { value: 41, field_name: "GPS" },
  { value: 42, field_name: "WINCH" },
  { value: 43, field_name: "GENERIC_MULTIROTOR" },
];

let mav_autopilot = [
  { value: 0, field_name: "GENERIC" },
  { value: 1, field_name: "RESERVED" },
  { value: 2, field_name: "SLUGS" },
  { value: 3, field_name: "ARDUPILOTMEGA" },
  { value: 4, field_name: "OPENPILOT" },
  { value: 5, field_name: "GENERIC_WAYPOINTS_ONLY" },
  { value: 6, field_name: "GENERIC_WAYPOINTS_AND_SIMPLE_NAVIGATION_ONLY" },
  { value: 7, field_name: "GENERIC_MISSION_FULL" },
  { value: 8, field_name: "INVALID" },
  { value: 9, field_name: "PPZ" },
  { value: 10, field_name: "UDB" },
  { value: 11, field_name: "FP" },
  { value: 12, field_name: "PX4" },
  { value: 13, field_name: "SMACCMPILOT" },
  { value: 14, field_name: "AUTOQUAD" },
  { value: 15, field_name: "ARMAZILA" },
  { value: 16, field_name: "AEROB" },
  { value: 17, field_name: "ASLUAV" },
  { value: 18, field_name: "SMARTAP" },
  { value: 19, field_name: "AIRRAILS" },
  { value: 20, field_name: "REFLEX" },
];

let mav_state = [
  { value: 0, field_name: "UNINIT" },
  { value: 1, field_name: "BOOT" },
  { value: 2, field_name: "CALIBRATING" },
  { value: 3, field_name: "STANDBY" },
  { value: 4, field_name: "ACTIVE" },
  { value: 5, field_name: "CRITICAL" },
  { value: 6, field_name: "EMERGENCY" },
  { value: 7, field_name: "POWEROFF" },
  { value: 8, field_name: "FLIGHT_TERMINATION" },
];

let mav_planemode = [
  { value: 0, field_name: "MANUAL" },
  { value: 1, field_name: "CIRCLE" },
  { value: 2, field_name: "STABILIZE" },
  { value: 3, field_name: "TRAINING" },
  { value: 4, field_name: "ACRO" },
  { value: 5, field_name: "FLY_BY_WIRE_A" },
  { value: 6, field_name: "FLY_BY_WIRE_B" },
  { value: 7, field_name: "CRUISE" },
  { value: 8, field_name: "AUTOTUNE" },
  { value: 9, field_name: "RES1" },
  { value: 10, field_name: "AUTO" },
  { value: 11, field_name: "RTL" },
  { value: 12, field_name: "LOITER" },
  { value: 13, field_name: "RES2" },
  { value: 14, field_name: "AVOID_ADSB" },
  { value: 15, field_name: "GUIDED" },
  { value: 16, field_name: "INITIALIZING" },
  { value: 17, field_name: "QSTABILIZE" },
  { value: 18, field_name: "QHOVER" },
  { value: 19, field_name: "QLOITER" },
  { value: 20, field_name: "QLAND" },
  { value: 21, field_name: "QRTL" },
];

let mav_severity = [
  { value: 0, field_name: "EMERGENCY" },
  { value: 1, field_name: "ALERT" },
  { value: 2, field_name: "CRITICAL" },
  { value: 3, field_name: "ERROR" },
  { value: 4, field_name: "WARNING" },
  { value: 5, field_name: "NOTICE" },
  { value: 6, field_name: "INFO" },
  { value: 7, field_name: "DEBUG" },
];
let mav_fixtype = [
  { value: 0, field_name: "NO_GPS" },
  { value: 1, field_name: "NO_FIX" },
  { value: 2, field_name: "_2D_FIX" },
  { value: 3, field_name: "_3D_FIX" },
  { value: 4, field_name: "DGPS" },
  { value: 5, field_name: "RTK_FLOAT" },
  { value: 6, field_name: "RTK_FIXED" },
  { value: 7, field_name: "STATIC" },
  { value: 8, field_name: "PPP" },
];
let mav_coordinateFrame = [
  { value: 0, field_name: "5. GLOBAL_INT" },
  { value: 1, field_name: "6. GLOBAL_RELATIVE_ALT_INT" },
  { value: 2, field_name: "11. GLOBAL_TERRAIN_ALT_INT" },
];

const BASE_URL = `http://127.0.0.1:8000`;

function App() {
  // const [recievedMessages, setRecievedMessages] = useState([]);
  // const sendNewItem = () => {
  //   const message = {
  //     type: "ADD_ITEM",
  //     message: {
  //       // timestamp: "12:20:00",
  //       message: "HEARTBEAT",
  //       direction: "UP",
  //       hexdata: "FE 06 00 01 01 7D 00 00 00 00 00 00 4D B3",
  //       messageData:
  //         '{"type": 0, "autopilot": 0, "state": 0, "plane_mode": 0, "armed": false, "manual": false, "hil": false, "stabilized": false, "guided": false, "auto": false, "test": false, "s_date_time": "14:23:18.829"}',
  //     },
  //   };

  //   if (socketRef.current.readyState === 1) {
  //     // checking if the connection is open
  //     socketRef.current.send(JSON.stringify(message));
  //   } else {
  //     console.log(
  //       "WebSocket connection is not open. readyState: ",
  //       socketRef.current.readyState
  //     );
  //   }
  // };

  // const sendSetMode = () => {
  //   const message = {
  //     type: "SetMode",
  //     message: {
  //       // timestamp: "12:20:00",
  //       mav_mode: "A",
  //       custom_mode: 4,
  //     },
  //   };

  //   if (socketRef.current.readyState === 1) {
  //     // checking if the connection is open
  //     socketRef.current.send(JSON.stringify(message));
  //   } else {
  //     console.log(
  //       "WebSocket connection is not open. readyState: ",
  //       socketRef.current.readyState
  //     );
  //   }
  // };
  // const sendAttitude = (roll,pitch,yaw,roll_speed,pitch_speed,yaw_speed) => {
  //   const message = {
  //     type: "ATTITUDE",
  //     message: {
  //       // timestamp: "12:20:00",
  //       roll,
  //       pitch,
  //       yaw,
  //       roll_speed,
  //       pitch_speed,
  //       yaw_speed,
  //     },
  //   };

  //   if (socketRef.current.readyState === 1) {
  //     // checking if the connection is open
  //     socketRef.current.send(JSON.stringify(message));
  //   } else {
  //     console.log(
  //       "WebSocket connection is not open. readyState: ",
  //       socketRef.current.readyState
  //     );
  //   }
  // };

  // const sendHeartbeat = (
  //   type,
  //   autopilot,
  //   state,
  //   planeMode,
  //   armed,
  //   manual,
  //   hil,
  //   stabilized,
  //   guided,
  //   auto,
  //   test
  // ) => {
  //   const message = {
  //     type: "HEARTBEAT",
  //     message: {
  //       // timestamp: "12:20:00",
  //       type,
  //       autopilot,
  //       state,
  //       planeMode,
  //       armed,
  //       manual,
  //       hil,
  //       stabilized,
  //       guided,
  //       auto,
  //       test,
  //     },
  //   };

  //   if (socketRef.current.readyState === 1) {
  //     // checking if the connection is open
  //     socketRef.current.send(JSON.stringify(message));
  //   } else {
  //     console.log(
  //       "WebSocket connection is not open. readyState: ",
  //       socketRef.current.readyState
  //     );
  //   }
  // };

  return (
    <>
      <BrowserRouter>
        <AppProvider>
        <Toaster/>
          <Routes>
            <Route index element={<Navigate replace to="welcome-screen" />} />
            <Route path="welcome-screen" element={<WelcomeScreen />} />
            <Route path="protosim-app" element={<MainScreen />}>
              <Route path="uavside" element={<UavSide />} />
              <Route path="gcsside" element={<GcsSide />} />
              <Route path="bothsides" element={<BothSides />} />
            </Route>
          </Routes>
        </AppProvider>
      </BrowserRouter>
      {/* <Navbar />
      <div className="container">
        <MessagesTable messages={recievedMessages} />
        <MessagesColumnContainer>
          {renderFromJSON()}
          <MessageWrapper
            typeOptions={mav_type}
            autopilotOptions={mav_autopilot}
            stateOptions={mav_state}
            planemodeOptions={mav_planemode}
            sendHeartbeat={sendHeartbeat}
          />
          <SetMode sendSetMode={sendSetMode} />
          <Attitude sendAttitude={sendAttitude} />
          <GlobalPositionMessage />
          <LocalPosition />
          <StatusText severityOptions={mav_severity} />
          <GpsRawInt fixtypeOption={mav_fixtype} />
          <VfrHud />
          <PositionTargetGlobal coordinateOptions={mav_coordinateFrame} />
          <AttitudeTarget />
          <HomePosition />
        </MessagesColumnContainer>
      </div> */}
      {/* <button onClick={() => sendSetMode()}>TEST MESSEAGE SENDING</button> */}
    </>
  );
}

export default App;

let obj = {
  label: "HEARTBEAT",
  fields: [
    {
      type: "select",
      label: "TYPE",
      options: [
        { value: 0, field_name: "GENERIC" },
        { value: 1, field_name: "FIXED_WING" },
        { value: 2, field_name: "QUADROTOR" },
        { value: 3, field_name: "COAXIAL" },
        { value: 4, field_name: "HELICOPTER" },
        { value: 5, field_name: "ANTENNA_TRACKER" },
        { value: 6, field_name: "GCS" },
        { value: 7, field_name: "AIRSHIP" },
        { value: 8, field_name: "FREE_BALLOON" },
        { value: 9, field_name: "ROCKET" },
        { value: 10, field_name: "GROUND_ROVER" },
        { value: 11, field_name: "SURFACE_BOAT" },
        { value: 12, field_name: "SUBMARINE" },
        { value: 13, field_name: "HEXAROTOR" },
        { value: 14, field_name: "OCTOROTOR" },
        { value: 15, field_name: "TRICOPTER" },
        { value: 16, field_name: "FLAPPING_WING" },
        { value: 17, field_name: "KITE" },
        { value: 18, field_name: "ONBOARD_CONTROLLER" },
        { value: 19, field_name: "VTOL_TAILSITTER_DUOROTOR" },
        { value: 20, field_name: "VTOL_TAILSITTER_QUADROTOR" },
        { value: 21, field_name: "VTOL_TILTROTOR" },
        { value: 22, field_name: "VTOL_FIXEDROTOR" },
        { value: 23, field_name: "VTOL_TAILSITTER" },
        { value: 24, field_name: "VTOL_TILTWING" },
        { value: 25, field_name: "VTOL_RESERVED5" },
        { value: 26, field_name: "GIMBAL" },
        { value: 27, field_name: "ADSB" },
        { value: 28, field_name: "PARAFOIL" },
        { value: 29, field_name: "DODECAROTOR" },
        { value: 30, field_name: "CAMERA" },
        { value: 31, field_name: "CHARGING_STATION" },
        { value: 32, field_name: "FLARM" },
        { value: 33, field_name: "SERVO" },
        { value: 34, field_name: "ODID" },
        { value: 35, field_name: "DECAROTOR" },
        { value: 36, field_name: "BATTERY" },
        { value: 37, field_name: "PARACHUTE" },
        { value: 38, field_name: "LOG" },
        { value: 39, field_name: "OSD" },
        { value: 40, field_name: "IMU" },
        { value: 41, field_name: "GPS" },
        { value: 42, field_name: "WINCH" },
        { value: 43, field_name: "GENERIC_MULTIROTOR" },
      ],
    },
    {
      type: "select",
      label: "AUTOPILOT",
      options: [
        { value: 0, field_name: "GENERIC" },
        { value: 1, field_name: "FIXED_WING" },
        { value: 2, field_name: "QUADROTOR" },
        { value: 3, field_name: "COAXIAL" },
        { value: 4, field_name: "HELICOPTER" },
        { value: 5, field_name: "ANTENNA_TRACKER" },
        { value: 6, field_name: "GCS" },
        { value: 7, field_name: "AIRSHIP" },
        { value: 8, field_name: "FREE_BALLOON" },
        { value: 9, field_name: "ROCKET" },
        { value: 10, field_name: "GROUND_ROVER" },
        { value: 11, field_name: "SURFACE_BOAT" },
        { value: 12, field_name: "SUBMARINE" },
        { value: 13, field_name: "HEXAROTOR" },
        { value: 14, field_name: "OCTOROTOR" },
        { value: 15, field_name: "TRICOPTER" },
        { value: 16, field_name: "FLAPPING_WING" },
        { value: 17, field_name: "KITE" },
        { value: 18, field_name: "ONBOARD_CONTROLLER" },
        { value: 19, field_name: "VTOL_TAILSITTER_DUOROTOR" },
        { value: 20, field_name: "VTOL_TAILSITTER_QUADROTOR" },
        { value: 21, field_name: "VTOL_TILTROTOR" },
        { value: 22, field_name: "VTOL_FIXEDROTOR" },
        { value: 23, field_name: "VTOL_TAILSITTER" },
        { value: 24, field_name: "VTOL_TILTWING" },
        { value: 25, field_name: "VTOL_RESERVED5" },
        { value: 26, field_name: "GIMBAL" },
        { value: 27, field_name: "ADSB" },
        { value: 28, field_name: "PARAFOIL" },
        { value: 29, field_name: "DODECAROTOR" },
        { value: 30, field_name: "CAMERA" },
        { value: 31, field_name: "CHARGING_STATION" },
        { value: 32, field_name: "FLARM" },
        { value: 33, field_name: "SERVO" },
        { value: 34, field_name: "ODID" },
        { value: 35, field_name: "DECAROTOR" },
        { value: 36, field_name: "BATTERY" },
        { value: 37, field_name: "PARACHUTE" },
        { value: 38, field_name: "LOG" },
        { value: 39, field_name: "OSD" },
        { value: 40, field_name: "IMU" },
        { value: 41, field_name: "GPS" },
        { value: 42, field_name: "WINCH" },
        { value: 43, field_name: "GENERIC_MULTIROTOR" },
      ],
    },
    {
      type: "select",
      label: "STATE",
      options: [
        { value: 0, field_name: "UNINIT" },
        { value: 1, field_name: "BOOT" },
        { value: 2, field_name: "CALIBRATING" },
        { value: 3, field_name: "STANDBY" },
        { value: 4, field_name: "ACTIVE" },
        { value: 5, field_name: "CRITICAL" },
        { value: 6, field_name: "EMERGENCY" },
        { value: 7, field_name: "POWEROFF" },
        { value: 8, field_name: "FLIGHT_TERMINATION" },
      ],
    },
    {
      type: "select",
      label: "Plane Mode",
      options: [
        { value: 0, field_name: "MANUAL" },
        { value: 1, field_name: "CIRCLE" },
        { value: 2, field_name: "STABILIZE" },
        { value: 3, field_name: "TRAINING" },
        { value: 4, field_name: "ACRO" },
        { value: 5, field_name: "FLY_BY_WIRE_A" },
        { value: 6, field_name: "FLY_BY_WIRE_B" },
        { value: 7, field_name: "CRUISE" },
        { value: 8, field_name: "AUTOTUNE" },
        { value: 9, field_name: "RES1" },
        { value: 10, field_name: "AUTO" },
        { value: 11, field_name: "RTL" },
        { value: 12, field_name: "LOITER" },
        { value: 13, field_name: "RES2" },
        { value: 14, field_name: "AVOID_ADSB" },
        { value: 15, field_name: "GUIDED" },
        { value: 16, field_name: "INITIALIZING" },
        { value: 17, field_name: "QSTABILIZE" },
        { value: 18, field_name: "QHOVER" },
        { value: 19, field_name: "QLOITER" },
        { value: 20, field_name: "QLAND" },
        { value: 21, field_name: "QRTL" },
      ],
    },
    {
      type: "checkbox",
      options: [
        { value: 0, field_name: "armed" },
        { value: 1, field_name: "manual" },
        { value: 2, field_name: "hil" },
        { value: 3, field_name: "stabilized" },
        { value: 4, field_name: "guided" },
        { value: 5, field_name: "auto" },
        { value: 6, field_name: "test" },
      ],
    },
  ],
  buttons: 1,
};

function renderFromJSON() {
  let compsArr = [];
  compsArr.push(
    <h4 key={obj.label} style={{ color: "#fff" }}>
      {obj.label}
    </h4>
  );
  for (let field of obj.fields) {
    // console.log(field)
    switch (field.type) {
      case "select":
        compsArr.push(
          <SelectFieldWithLabel
            key={field.label}
            label={field.label}
            options={field.options}
          />
        );
        break;
      case "checkbox":
        compsArr.push(
          <CheckBoxesContainer key={field.label}>
            {field.options.map((checkbox, i) => (
              <Checkbox key={i} label={checkbox.field_name} />
            ))}
          </CheckBoxesContainer>
        );
        //  console.log(compsArr)

        break;

      default:
    }
  }
  let messageArr = [];

  compsArr.push(<SendButtonsContainer />);
  messageArr.push(
    <div key={obj.label} className="message-wrapper">
      {compsArr}
    </div>
  );
  // messageArr.push(<div className="message-wrapper">{compsArr}</div>);
  // messageArr.push(<div className="message-wrapper">{compsArr}</div>);
  // messageArr.push(<div className="message-wrapper">{compsArr}</div>);
  // messageArr.push(<div className="message-wrapper">{compsArr}</div>);
  // messageArr.push(<div className="message-wrapper">{compsArr}</div>);
  return messageArr;
}
