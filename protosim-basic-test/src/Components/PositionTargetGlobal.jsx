import React from "react";
import SelectFieldWithLabel from "./SelectFieldWithLabel";
import HeaderMessage from "./HeaderMessage";
import InputNumber from "./InputNumberAndLabel";
import Checkbox from "./Checkbox";
import CheckBoxesContainer from "./CheckBoxesContainer";
import SendButtonsContainer from "./SendButtonsContainer";

function PositionTargetGlobal({ coordinateOptions }) {
  return (
    <div className="message-wrapper">
      <HeaderMessage header="POSITION_TARGET_GLOBAL_INT" />
      <SelectFieldWithLabel
        label={"Coordinate frame"}
        options={coordinateOptions}
      />
      <InputNumber label="Latitude" dimension="deg" />
      <InputNumber label="Longtitude" dimension="deg" />
      <InputNumber label="Altitude" dimension="m" />
      <InputNumber label="Velocity X" dimension="ms" />
      <InputNumber label="Velocity Y" dimension="ms" />
      <InputNumber label="Velocity Z" dimension="ms" />
      <InputNumber label="Acc or force X" dimension="ms2" />
      <InputNumber label="Acc or force Y" dimension="ms2" />
      <InputNumber label="Acc or force Z" dimension="ms2" />
      <InputNumber label="Yaw" dimension="rad" />
      <InputNumber label="Yaw rate" dimension="rad2" />
      <CheckBoxesContainer>
        <Checkbox label="x" />
        <Checkbox label="y" />
        <Checkbox label="z" />
        <Checkbox label="vx" />
        <Checkbox label="vy" />
        <Checkbox label="vz" />
        <Checkbox label="ax" />
        <Checkbox label="ay" />
        <Checkbox label="az" />
        <Checkbox label="f" />
        <Checkbox label="yaw" />
        <Checkbox label="rate" />
      </CheckBoxesContainer>
      <SendButtonsContainer />
    </div>
  );
}
export default PositionTargetGlobal;
