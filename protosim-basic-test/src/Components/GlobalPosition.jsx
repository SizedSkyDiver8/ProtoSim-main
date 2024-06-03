import React from "react";
import SelectFieldWithLabel from "./SelectFieldWithLabel";
import InputNumber from "./InputNumberAndLabel";
import SendButtonsContainer from "./SendButtonsContainer";
import HeaderMessage from "./HeaderMessage";

function GlobalPositionMessage() {
  return (
    <div className="message-wrapper">
        <HeaderMessage header="GLOBAL_POSITION_INT"/>
      <InputNumber label="Latitude" dimension="deg" />
      <InputNumber label="Longitude" dimension="deg" />
      <InputNumber label="Altitude" dimension="m" />
      <InputNumber label="Relative altitude" dimension="m" />
      <InputNumber label="Velocity X" dimension="ms" />
      <InputNumber label="Velocity Y" dimension="ms" />
      <InputNumber label="Velocity Z" dimension="ms" />
      <InputNumber label="heading" dimension="deg" />
      <SendButtonsContainer />
    </div>
  );
}
export default GlobalPositionMessage;
