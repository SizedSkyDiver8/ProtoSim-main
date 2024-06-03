import React from "react";
import HeaderMessage from "./HeaderMessage";
import InputNumber from "./InputNumberAndLabel";
import SendButtonsContainer from "./SendButtonsContainer";

function VfrHud() {
  return (
    <div className="message-wrapper">
      <HeaderMessage header="VFR_HUD" />
      <InputNumber label="airspeed" dimension="m/s" />
      <InputNumber label="ground speed" dimension="m/s" />
      <InputNumber label="heading" dimension="deg" />
      <InputNumber label="throttle" dimension="%" />
      <InputNumber label="alt" dimension="m" />
      <InputNumber label="climb" dimension="ms" />
      <SendButtonsContainer />
    </div>
  );
}
export default VfrHud;
