import React from "react";

function InputNumber({ label, dimension }) {
  return (
    <div className="input-field-with-label">
      <label>{label}</label>
      <div className="label-input">
        <label className="dimension-label">{dimension}</label>
        <input type="number" value="0.000000" />
      </div>
    </div>
  );
}
export default InputNumber;
