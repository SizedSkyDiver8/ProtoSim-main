import React from "react";
import InputNumber from "./InputNumberAndLabel";
import SendButtonsContainer from "./SendButtonsContainer";
import HeaderMessage from "./HeaderMessage";

function LocalPosition() {
  return (
    <div className="message-wrapper">
      <HeaderMessage header="LOCAL_POSITION_NED" />
      <InputNumber label="X posotion" dimension="deg" />
      <InputNumber label="Latitude" dimension="deg" />
      <InputNumber label="Y posotion" dimension="deg" />
      <InputNumber label="Z position" dimension="m" />
      <InputNumber label="Velocity X" dimension="ms" />
      <InputNumber label="Velocity Y" dimension="ms" />
      <InputNumber label="Velocity Z" dimension="ms" />
      <SendButtonsContainer />
    </div>
  );
}
export default LocalPosition;
