import React from "react";

function BothSides({ uavSideChildren, gcsSideChildren }) {
  return (
    <div className="column-container">
      <div className="column-wrapper">
        {React.Children.toArray(uavSideChildren).map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </div>
      <div className="column-wrapper">
        {React.Children.toArray(gcsSideChildren).map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </div>
    </div>
  );
}

export default BothSides;
