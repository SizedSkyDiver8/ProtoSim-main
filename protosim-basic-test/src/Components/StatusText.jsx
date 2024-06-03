import React from "react";
import SelectFieldWithLabel from "./SelectFieldWithLabel";
import HeaderMessage from "./HeaderMessage";

function StatusText({ severityOptions }) {
  return (
    <div className="message-wrapper">
      <HeaderMessage header="STATUSTEXT" />
      <SelectFieldWithLabel label={"severity"} options={severityOptions} />
      <div className="label-input-text">
        <label>text</label>
        <input type="text" />
      </div>
    </div>
  );
}

{
  /* Need to fix the buttons */
}

export default StatusText;
