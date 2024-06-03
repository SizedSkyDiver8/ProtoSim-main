import React from "react";
import HeaderMessage from "./HeaderMessage";
import InputNumber from "./InputNumberAndLabel";
import SendButtonsContainer from "./SendButtonsContainer";
import CheckBoxesContainer from "./CheckBoxesContainer";
import Checkbox from "./Checkbox";

function AttitudeTarget() {
  return (
    <div className="message-wrapper">
      <HeaderMessage header="ATTITUDE_TARGET" />
      <InputNumber label="Quaternion W" />
      <InputNumber label="Quaternion X" />
      <InputNumber label="Quaternion Y" />
      <InputNumber label="Quaternion Z" />
      <InputNumber label="Body roll rate" dimension="rad/s" />
      <InputNumber label="Z position" dimension="m" />
      <InputNumber label="Z position" dimension="m" />
      <InputNumber label="Z position" dimension="m" />
      <CheckBoxesContainer>
        <Checkbox label="armed" />
        <Checkbox label="manual" />
        <Checkbox label="hil" />
        <Checkbox label="stabilized" />
        <Checkbox label="guided" />
        <Checkbox label="auto" />
        <Checkbox label="test" />
      </CheckBoxesContainer>
      <SendButtonsContainer />
    </div>
  );
}
export default AttitudeTarget;
