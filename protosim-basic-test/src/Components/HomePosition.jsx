import React from "react";
import HeaderMessage from "./HeaderMessage";
import InputNumber from "./InputNumberAndLabel";
import SendButtonsContainer from "./SendButtonsContainer";

function HomePosition() {
  return (
    <div className="message-wrapper">
      <HeaderMessage header="HOME_POSITION" />
      <InputNumber label="approach_x" dimension="m" />
      <InputNumber label="approach_y" dimension="m" />
      <InputNumber label="approach_z" dimension="m" />
      <InputNumber label="x" dimension="m" />
      <InputNumber label="y" dimension="m" />
      <InputNumber label="z" dimension="m" />
      <InputNumber label="q" dimension="m" />
      <InputNumber label="latitude" dimension="deg" />
      <InputNumber label="longtitude" dimension="deg" />
      <InputNumber label="altitude" dimension="m" />
      <SendButtonsContainer />
      {/* Need to fix the buttons */}
    </div>
  );
}
export default HomePosition;
