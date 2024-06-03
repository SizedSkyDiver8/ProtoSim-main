import { useEffect, useState } from "react";
import { useBlueBird } from "../../contexts/AppContext";

function WelcomeScreen() {
  const {initializeGCS, initializeUAV,gcsPort,uavPort, setGcsPort,setUavPort,initializeBoth} = useBlueBird();
  const [isUAVMode, setIsUAVMode] = useState(true);
  const [isGCSMode, setIsGCSMode] = useState(false);


 

  const handleUAVClick = () => {
    setIsUAVMode(true)
    setIsGCSMode(false)
  }
  const handleGCSClick = () => {
      setIsGCSMode(true)
      setIsUAVMode(false)
  }

  const handleBothSidesClick = () => {
    initializeBoth()

  }
  return (
    <div className="welcome-screen-container css-selector">
      <div className="select-panel-container">
        <h1>CHOOSE MODE</h1>
        <div className="port-selection">
          <h4>Side and Port Selection</h4>
          <div className="welcome-input">
            <label style={{color:"black"}} htmlFor="">UAV</label>
            <button className="button-port-input style-button" onClick={() => handleUAVClick()}>{isUAVMode? "Simulate" : "Monitor"}</button>
            <input value={uavPort} onChange={(e) => setUavPort(e.target.value)} disabled={isGCSMode} className="port-input" type="number" name="" id="" />
          </div>
          <div className="welcome-input">
            <label style={{color:"black"}} htmlFor="">GCS</label>
            <button className="button-port-input style-button" onClick={() => handleGCSClick()}>{isGCSMode? "Simulate": "Monitor"}</button>
            <input value={gcsPort} onChange={(e) => setGcsPort(e.target.value)} disabled={isUAVMode} className="port-input" type="number" name="" id="" />
          </div>
          <div>
          <button className="style-button" onClick={isUAVMode? () => initializeUAV() : () => initializeGCS()}>Connect</button>
          <button className="style-button" onClick={handleBothSidesClick}>Both Sides</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
