import { useState } from "react";
import CheckBoxesContainer from "./CheckBoxesContainer";
import Checkbox from "./Checkbox";
import HeaderMessage from "./HeaderMessage";
import SelectFieldWithLabel from "./SelectFieldWithLabel";
import SendButtonsContainer from "./SendButtonsContainer";

function MessageWrapper({
  typeOptions,
  autopilotOptions,
  stateOptions,
  planemodeOptions,sendHeartbeat
}) {
  const [type,setType] = useState(typeOptions[0].value)
  const [autopilot,setAutopilot] = useState(autopilotOptions[0].value)
  const [state,setState] = useState(stateOptions[0].value)
  const [planeMode,setPlanemode] = useState(planemodeOptions[0].value)
const [armed, setArmed] = useState(false)
const [manual, setManual] = useState(false)
const [hil, setHil] = useState(false)
const [stabilized, setStabilized] = useState(false)
const [guided,setGuided] = useState(false)
const [auto, setAuto] = useState(false)
const [test, setTest] = useState(false)
  return (
    <div className="message-wrapper">
      <HeaderMessage header="HEARTBEAT" />
      {/* <SelectFieldWithLabel label={"type"} options={typeOptions} />
      <SelectFieldWithLabel label={"autopilot"} options={autopilotOptions} />
      <SelectFieldWithLabel label={"state"} options={stateOptions} />
      <SelectFieldWithLabel label={"planemode"} options={planemodeOptions} /> */}
      <div className="input-field-with-label">
        <label htmlFor="">TYPE:</label>
        <select value={type} onChange={(e)=>setType(e.target.value)} className="select-message" name="" id="">
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.field_name}</option>
          ))}
        </select>
      </div>
      <div className="input-field-with-label">
        <label htmlFor="">AUTOPILOT:</label>
        <select value={autopilot} onChange={(e)=>setAutopilot(e.target.value)} className="select-message" name="" id="">
          {autopilotOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.field_name}</option>
          ))}
        </select>
      </div>
      <div className="input-field-with-label">
        <label htmlFor="">PLANEMODE:</label>
        <select value={planeMode} onChange={(e)=>setPlanemode(e.target.value)} className="select-message" name="" id="">
          {planemodeOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.field_name}</option>
          ))}
        </select>
      </div>
      <div className="input-field-with-label">
        <label htmlFor="">STATE:</label>
        <select value={state} onChange={(e)=>setState(e.target.value)} className="select-message" name="" id="">
          {stateOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.field_name}</option>
          ))}
        </select>
      </div>
      <CheckBoxesContainer>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <label>armed</label>
        <input type="checkbox" checked={armed} onChange={() => setArmed(!armed)} />
        </div>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <label>manual</label>
        <input type="checkbox" checked={manual} onChange={() => setManual(!manual)} />
        </div>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <label>hil</label>
        <input type="checkbox" checked={hil} onChange={() => setHil(!hil)} />
        </div>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <label>stabilized</label>
        <input type="checkbox" checked={stabilized} onChange={() => setStabilized(!stabilized)} />
        </div>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <label>guided</label>
        <input type="checkbox" checked={guided} onChange={() => setGuided(!guided)} />
        </div>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <label>auto</label>
        <input type="checkbox" checked={auto} onChange={() => setAuto(!auto)} />
        </div>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <label>test</label>
        <input type="checkbox" checked={test} onChange={() => setTest(!test)} />
        </div>
      </CheckBoxesContainer>
      <button onClick={() =>sendHeartbeat(type,autopilot,state,planeMode,armed,manual,hil,stabilized,guided,auto,test)}></button>
      <SendButtonsContainer />
    </div>
  );
}

export default MessageWrapper;
