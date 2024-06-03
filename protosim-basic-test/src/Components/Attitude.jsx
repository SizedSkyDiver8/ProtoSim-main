import React, { useEffect, useState } from "react";
import InputNumber from "./InputNumberAndLabel";
import SendButtonsContainer from "./SendButtonsContainer";
import HeaderMessage from "./HeaderMessage";
import SquareButton from "./SquareButton";
import { useBlueBird } from "../../contexts/AppContext";

function Attitude({disabled}) {
  const {socketRef,counters,recievedMessages,trimTimestamp, tempDataTransfer,setTempDataTransfer} = useBlueBird();
const [roll, setRoll]= useState(0)  
const [pitch, setPitch]= useState(0)
const [yaw, setYaw]= useState(0)
const [roll_speed, setRollSpeed]= useState(0)
const [pitch_speed, setPitchSpeed]= useState(0)
const [yaw_speed, setYawSpeed]= useState(0)  
const [timestamp,setTimestamp] = useState("")
const [stepValue, setStepValue] = useState(0)
const [isSending, setIsSending] = useState(false); // To track if messages are being sent
const [timerId, setTimerId] = useState(null); // To store timer ID


useEffect(function(){
  recievedMessages.forEach(mes => {
    if(mes.message === "30"){      
      let m = JSON.parse(mes.messageData)
      setRoll(m.roll)
      setPitch(m.pitch)
      setYaw(m.yaw)
      setRollSpeed(m.roll_speed)
      setPitchSpeed(m.pitch_speed)
      setYawSpeed(m.yaw_speed)
      setTimestamp(trimTimestamp(mes.timestamp))
      return
    }
  });
},[recievedMessages])

useEffect(function(){
  if(tempDataTransfer && disabled ){
    let m = JSON.parse(tempDataTransfer["messageData"])
    setRoll(m.roll)
    setPitch(m.pitch)
    setYaw(m.yaw)
    setRollSpeed(m.roll_speed)
    setPitchSpeed(m.pitch_speed)
    setYawSpeed(m.yaw_speed)
    setTimestamp(trimTimestamp(tempDataTransfer.timestamp))
  }

  return () => {
    setTempDataTransfer(null)
  }

},[tempDataTransfer])

const toggleSending = () => {
  if (isSending) {
    // Stop sending
    clearInterval(timerId);
    setIsSending(false);
    setTimerId(null);
  } else {
    // Start sending
    const id = setInterval(() => {
      sendAttitude(roll,pitch,yaw,roll_speed,pitch_speed,yaw_speed);
    }, stepValue);
    setTimerId(id);
    setIsSending(true);
  }
};

const sendAttitude = (roll,pitch,yaw,roll_speed,pitch_speed,yaw_speed) => {
  const message = {
    type: "ATTITUDE",
    message: {
      // timestamp: "12:20:00",
      roll,
      pitch,
      yaw,
      roll_speed,
      pitch_speed,
      yaw_speed,
    },
  };

  if (socketRef.current.readyState === 1) {
    // checking if the connection is open
    socketRef.current.send(JSON.stringify(message));
  } else {
    console.log(
      "WebSocket connection is not open. readyState: ",
      socketRef.current.readyState
    );
  }
};
  return (
    <div className="message-wrapper">
      <div className="messeage-counter">[{counters["30"] || 0 }]</div>
      <HeaderMessage header="ATTITUDE" />
      <div className="input-field-with-label">
      <label>{"roll"}</label>
      <div className="label-input">
        <input disabled={disabled} type="number" value={roll} onChange={(e) => setRoll(Number(e.target.value))}  />
        <label className="dimension-label">{"deg"}</label>
      </div>
    </div>
    <div className="input-field-with-label">
      <label>{"pitch"}</label>
      <div className="label-input">
        <input disabled={disabled} type="number" value={pitch} onChange={(e) => setPitch(Number(e.target.value))}  />
        <label className="dimension-label">{"deg"}</label>
      </div>
    </div>
    <div className="input-field-with-label">
      <label>{"yaw"}</label>
      <div className="label-input">
        <input disabled={disabled} type="number" value={yaw} onChange={(e) => setYaw(Number(e.target.value))}  />
        <label className="dimension-label">{"deg"}</label>
      </div>
    </div>
    <div className="input-field-with-label">
      <label>{"roll_speed"}</label>
      <div className="label-input">
        <input disabled={disabled} type="number" value={roll_speed} onChange={(e) => setRollSpeed(Number(e.target.value))}  />
        <label className="dimension-label">{"deg/s"}</label>
      </div>
    </div>
    <div className="input-field-with-label">
      <label>{"pitch_speed"}</label>
      <div className="label-input">
        <input disabled={disabled} type="number" value={pitch_speed} onChange={(e) => setPitchSpeed(Number(e.target.value))}  />
        <label className="dimension-label">{"deg/s"}</label>
      </div>
    </div>
    <div className="input-field-with-label">
      <label>{"yaw_speed"}</label>
      <div className="label-input">
        <input disabled={disabled} type="number" value={yaw_speed} onChange={(e) => setYawSpeed(Number(e.target.value))}  />
        <label className="dimension-label">{"deg/s"}</label>
      </div>
    </div>
      {/* <InputNumber label="Roll" dimension="deg" />
      <InputNumber label="Pitch" dimension="deg" />
      <InputNumber label="Yaw" dimension="deg" />
      <InputNumber label="Rool Speed" dimension="deg/s" />
      <InputNumber label="Pitch Speed" dimension="deg/s" />
    <InputNumber label="Yaw Spped" dimension="deg/s" /> */}
      {!disabled && 
      <>
      {/* <SquareButton onClick={() => sendAttitude(roll,pitch,yaw,roll_speed,pitch_speed,yaw_speed)} type={"send"} /> */}
      {/* <span className="timestamp">{timestamp}</span> */}
      <div className="send-buttons-container">
            <span className="timestamp">{timestamp || "00:00:00"}</span>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center", gap:"10px"}}>
            <input step={150} onChange={(e) => setStepValue(parseInt(e.target.value))} style={{width:"100px"}} min={0} max={9999} value={stepValue} className="repeat-input" type="number" inputMode="numeric"  />
            ms
            <SquareButton onClick={toggleSending} type={isSending? "pause" : "repeat"} />
            </div>
            <SquareButton onClick={() => sendAttitude(roll,pitch,yaw,roll_speed,pitch_speed,yaw_speed)} type={"send"} />
        </div>
      </>}
      {disabled && <span className="timestamp">{timestamp || "00:00:00"}</span>}

      {/* <SendButtonsContainer onClick={sendAttitude} /> */}
    </div>
  );
}
export default Attitude;
