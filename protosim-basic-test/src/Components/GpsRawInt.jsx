// import React, { useState } from "react";
// import HeaderMessage from "./HeaderMessage";
// import SelectFieldWithLabel from "./SelectFieldWithLabel";
// import InputNumber from "./InputNumberAndLabel";
// import SendButtonsContainer from "./SendButtonsContainer";
// import { useBlueBird } from "../../contexts/AppContext";
// import SquareButton from "./SquareButton";

// let mav_fixtype = [
//   { value: 0, field_name: "NO_GPS" },
//   { value: 1, field_name: "NO_FIX" },
//   { value: 2, field_name: "_2D_FIX" },
//   { value: 3, field_name: "_3D_FIX" },
//   { value: 4, field_name: "DGPS" },
//   { value: 5, field_name: "RTK_FLOAT" },
//   { value: 6, field_name: "RTK_FIXED" },
//   { value: 7, field_name: "STATIC" },
//   { value: 8, field_name: "PPP" },
// ];

// function GpsRawInt({disabled}) {
//   const {socketRef,counters,recievedMessages,trimTimestamp} = useBlueBird();
// const [fixType, setFixType] = useState(null )
// const [lat, setLat] = useState(0)
// const [lon, setLon] = useState(0)
// const [alt, setAlt] = useState(0)
// const [eph, setEph] = useState(0)
// const [epv, setEpv] = useState(0)
// const [velocity, setVelocity] = useState(0)
// const [courseOverGround, setCourseOverGround] = useState(0)
// const [satellitesVisible, setSatellitesVisible] = useState(0)
// const [gpsTime, setGpsTime] = useState(0)
//   const [timestamp,setTimestamp] = useState("")
//   const [stepValue, setStepValue] = useState(0)
//   const [isSending, setIsSending] = useState(false); // To track if messages are being sent
//   const [timerId, setTimerId] = useState(null); // To store timer ID


//   const toggleSending = () => {
//     if (isSending) {
//       // Stop sending
//       clearInterval(timerId);
//       setIsSending(false);
//       setTimerId(null);
//     } else {
//       // Start sending
//       sendGpsRawInt(fixType,lat,lon,alt,eph,epv,velocity,courseOverGround,satellitesVisible,gpsTime)
//       const id = setInterval(() => {
//       }, stepValue);
//       setTimerId(id);
//       setIsSending(true);
//     }
//   };
  
//   const sendGpsRawInt = (fixType,lat,lon,alt,eph,epv,velocity,courseOverGround,satellitesVisible,gpsTime) => {
//     const message = {
//       type: "GPS_RAW_INT",
//       message: {
//         // timestamp: "12:20:00",]
//         fixType,
//         lat,
//         lon,
//         alt,
//         eph,
//         epv,
//         velocity,
//         courseOverGround,
//         satellitesVisible,
//         gpsTime
//       },
//     };
  
//     if (socketRef.current.readyState === 1) {
//       // checking if the connection is open
//       socketRef.current.send(JSON.stringify(message));
//     } else {
//       console.log(
//         "WebSocket connection is not open. readyState: ",
//         socketRef.current.readyState
//       );
//     }
//   };
//   return (
// <div className="message-wrapper">
//       <div className="messeage-counter">[{counters["24"] || 0 }]</div>
//       <HeaderMessage header="GPS_RAW_INT" />
//       <div className="input-field-with-label"> 
//       <label>{"fix_type"}</label>
//       <div className="label-input">
//         <select name="" id="" value={fixType} onChange={(e) => setFixType(e.target.value)} >
//           <option value="" disabled>Choose </option>
//          { mav_fixtype.map((type, i) => <option key={i} value={i}>{type.field_name}</option>)}
//         </select>
//         <label className="dimension-label">{""}</label>
//       </div>
//     </div>
//     <div className="input-field-with-label">
//       <label>{"lat"}</label>
//       <div className="label-input">
//         <input disabled={disabled} type="number" step={0.01}value={lat} onChange={(e) => setLat(Number(e.target.value))}  />
//         <label className="dimension-label">{""}</label>
//       </div>
//     </div>
//     <div className="input-field-with-label">
//       <label>{"lon"}</label>
//       <div className="label-input">
//         <input disabled={disabled} type="number" step={0.01}value={lon} onChange={(e) => setLon(Number(e.target.value))}   />
//         <label className="dimension-label">{""}</label>
//       </div>
//     </div>
//     <div className="input-field-with-label">
//       <label>{"alt"}</label>
//       <div className="label-input">
//         <input disabled={disabled} type="number" step={0.01}value={alt} onChange={(e) => setAlt(Number(e.target.value))}  />
//         <label className="dimension-label">{"m"}</label>
//       </div>
//     </div>
//     <div className="input-field-with-label">
//       <label>{"eph"}</label>
//       <div className="label-input">
//         <input disabled={disabled} type="number" value={eph} onChange={(e) => setEph(Number(e.target.value))}  />
//         <label className="dimension-label">{""}</label>
//       </div>
//     </div>
//     <div className="input-field-with-label">
//       <label>{"epv"}</label>
//       <div className="label-input">
//         <input disabled={disabled} type="number" value={epv} onChange={(e) => setEpv(Number(e.target.value))}  />
//         <label className="dimension-label">{""}</label>
//       </div>
//     </div>
//     <div className="input-field-with-label">
//       <label>{"velocity"}</label>
//       <div className="label-input">
//         <input disabled={disabled} type="number" step={0.01}value={velocity} onChange={(e) => setVelocity(Number(e.target.value))}   />
//         <label className="dimension-label">{"m/s"}</label>
//       </div>
//     </div>
//     <div className="input-field-with-label">
//       <label>{"course over ground"}</label>
//       <div className="label-input">
//         <input disabled={disabled} type="number" step={0.01}value={courseOverGround} onChange={(e) => setCourseOverGround(Number(e.target.value))}   />
//         <label className="dimension-label">{"deg"}</label>
//       </div>
//     </div>
//     <div className="input-field-with-label">
//       <label>{"satellites visible"}</label>
//       <div className="label-input">
//         <input disabled={disabled} type="number" value={satellitesVisible} onChange={(e) => setSatellitesVisible(Number(e.target.value))}  />
//         <label className="dimension-label">{""}</label>
//       </div>
//     </div>
//     <div className="input-field-with-label">
//       <label>{"GPS time"}</label>
//       <div className="label-input">
//         <input disabled={disabled} type="number" value={gpsTime} onChange={(e) => setGpsTime(Number(e.target.value))}   />
//         <label className="dimension-label">{""}</label>
//       </div>
//     </div>
//       {/* <InputNumber label="Roll" dimension="deg" />
//       <InputNumber label="Pitch" dimension="deg" />
//       <InputNumber label="Yaw" dimension="deg" />
//       <InputNumber label="Rool Speed" dimension="deg/s" />
//       <InputNumber label="Pitch Speed" dimension="deg/s" />
//     <InputNumber label="Yaw Spped" dimension="deg/s" /> */}
//       {!disabled && 
//       <>
//       {/* <SquareButton onClick={() => sendAttitude(roll,pitch,yaw,roll_speed,pitch_speed,yaw_speed)} type={"send"} /> */}
//       {/* <span className="timestamp">{timestamp}</span> */}
//       <div className="send-buttons-container">
//             <span className="timestamp">{timestamp || "00:00:00"}</span>
//             <div style={{display:"flex",justifyContent:"center",alignItems:"center", gap:"10px"}}>
//             <input step={150} onChange={(e) => setStepValue(parseInt(e.target.value))} style={{width:"100px"}} min={0} max={9999} value={stepValue} className="repeat-input" type="number" inputMode="numeric"  />
//             ms
//             <SquareButton onClick={() => toggleSending()} type={isSending? "pause" : "repeat"} />
//             </div>
//             <SquareButton onClick={() => sendGpsRawInt(fixType,lat,lon,alt,eph,epv,velocity,courseOverGround,satellitesVisible,gpsTime)} type={"send"} />
//         </div>
//       </>}
//       {disabled && <span className="timestamp">{timestamp || "00:00:00"}</span>}

//       {/* <SendButtonsContainer onClick={sendAttitude} /> */}
//     </div>
//   );
// }

// export default GpsRawInt;
import React, { useState } from "react";
import HeaderMessage from "./HeaderMessage";
import SelectFieldWithLabel from "./SelectFieldWithLabel";
import InputNumber from "./InputNumberAndLabel";
import SendButtonsContainer from "./SendButtonsContainer";
import { useBlueBird } from "../../contexts/AppContext";
import SquareButton from "./SquareButton";

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

function GpsRawInt({ disabled }) {
  const { socketRef, counters, trimTimestamp } = useBlueBird();
  const [fixType, setFixType] = useState(0);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [alt, setAlt] = useState(0);
  const [eph, setEph] = useState(0);
  const [epv, setEpv] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [courseOverGround, setCourseOverGround] = useState(0);
  const [satellitesVisible, setSatellitesVisible] = useState(0);
  const [gpsTime, setGpsTime] = useState(0);
  const [timestamp, setTimestamp] = useState("");
  const [stepValue, setStepValue] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const toggleSending = () => {
    if (isSending) {
      clearInterval(timerId);
      setIsSending(false);
      setTimerId(null);
    } else {
      sendGpsRawInt(fixType, lat, lon, alt, eph, epv, velocity, courseOverGround, satellitesVisible, gpsTime);
      const id = setInterval(() => {
        sendGpsRawInt(fixType, lat, lon, alt, eph, epv, velocity, courseOverGround, satellitesVisible, gpsTime);
      }, stepValue);
      setTimerId(id);
      setIsSending(true);
    }
  };

  const sendGpsRawInt = (fixType, lat, lon, alt, eph, epv, velocity, courseOverGround, satellitesVisible, gpsTime) => {
    const message = {
      type: "GPS_RAW_INT",
      message: {
        fixType,
        lat,
        lon,
        alt,
        eph,
        epv,
        velocity,
        courseOverGround,
        satellitesVisible,
        gpsTime
      },
    };

    if (socketRef.current.readyState === 1) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.log("WebSocket connection is not open. readyState: ", socketRef.current.readyState);
    }
  };

  return (
    <div className="message-wrapper">
      <div className="messeage-counter">[{counters["24"] || 0}]</div>
      <HeaderMessage header="GPS_RAW_INT" />
      <div className="input-field-with-label">
        <label>{"fix_type"}</label>
        <div className="label-input">
          <select
            disabled={disabled}
            value={fixType}
            onChange={(e) => setFixType(Number(e.target.value))}
          >
            <option value="" disabled>Choose</option>
            {mav_fixtype.map((type, i) => (
              <option key={i} value={type.value}>{type.field_name}</option>
            ))}
          </select>
          <label className="dimension-label">{""}</label>
        </div>
      </div>
      <div className="input-field-with-label">
        <label>{"lat"}</label>
        <div className="label-input">
          <input
            disabled={disabled}
            type="number"
            step={0.01}
            value={lat}
            onChange={(e) => setLat(parseFloat(e.target.value))}
          />
          <label className="dimension-label">{""}</label>
        </div>
      </div>
      <div className="input-field-with-label">
        <label>{"lon"}</label>
        <div className="label-input">
          <input
            disabled={disabled}
            type="number"
            step={0.01}
            value={lon}
            onChange={(e) => setLon(parseFloat(e.target.value))}
          />
          <label className="dimension-label">{""}</label>
        </div>
      </div>
      <div className="input-field-with-label">
        <label>{"alt"}</label>
        <div className="label-input">
          <input
            disabled={disabled}
            type="number"
            step={0.01}
            value={alt}
            onChange={(e) => setAlt(parseFloat(e.target.value))}
          />
          <label className="dimension-label">{"m"}</label>
        </div>
      </div>
      <div className="input-field-with-label">
        <label>{"eph"}</label>
        <div className="label-input">
          <input
            disabled={disabled}
            type="number"
            value={eph}
            onChange={(e) => setEph(Number(e.target.value))}
          />
          <label className="dimension-label">{""}</label>
        </div>
      </div>
      <div className="input-field-with-label">
        <label>{"epv"}</label>
        <div className="label-input">
          <input
            disabled={disabled}
            type="number"
            value={epv}
            onChange={(e) => setEpv(Number(e.target.value))}
          />
          <label className="dimension-label">{""}</label>
        </div>
      </div>
      <div className="input-field-with-label">
        <label>{"velocity"}</label>
        <div className="label-input">
          <input
            disabled={disabled}
            type="number"
            step={0.01}
            value={velocity}
            onChange={(e) => setVelocity(parseFloat(e.target.value))}
          />
          <label className="dimension-label">{"m/s"}</label>
        </div>
      </div>
      <div className="input-field-with-label">
        <label>{"course over ground"}</label>
        <div className="label-input">
          <input
            disabled={disabled}
            type="number"
            step={0.01}
            value={courseOverGround}
            onChange={(e) => setCourseOverGround(parseFloat(e.target.value))}
          />
          <label className="dimension-label">{"deg"}</label>
        </div>
      </div>
      <div className="input-field-with-label">
        <label>{"satellites visible"}</label>
        <div className="label-input">
          <input
            disabled={disabled}
            type="number"
            value={satellitesVisible}
            onChange={(e) => setSatellitesVisible(Number(e.target.value))}
          />
          <label className="dimension-label">{""}</label>
        </div>
      </div>
      <div className="input-field-with-label">
        <label>{"GPS time"}</label>
        <div className="label-input">
          <input
            disabled={disabled}
            type="number"
            value={gpsTime}
            onChange={(e) => setGpsTime(Number(e.target.value))}
          />
          <label className="dimension-label">{""}</label>
        </div>
      </div>
      {!disabled && (
        <>
          <div className="send-buttons-container">
            <span className="timestamp">{timestamp || "00:00:00"}</span>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
              <input
                step={150}
                onChange={(e) => setStepValue(parseInt(e.target.value))}
                style={{ width: "100px" }}
                min={0}
                max={9999}
                value={stepValue}
                className="repeat-input"
                type="number"
                inputMode="numeric"
              />
              ms
              <SquareButton onClick={() => toggleSending()} type={isSending ? "pause" : "repeat"} />
            </div>
            <SquareButton onClick={() => sendGpsRawInt(fixType, lat, lon, alt, eph, epv, velocity, courseOverGround, satellitesVisible, gpsTime)} type={"send"} />
          </div>
        </>
      )}
      {disabled && <span className="timestamp">{timestamp || "00:00:00"}</span>}
    </div>
  );
}

export default GpsRawInt;
