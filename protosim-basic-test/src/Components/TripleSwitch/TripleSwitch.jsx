import React, { useState } from "react";
import PropTypes from "prop-types";
import "./TripleSwitch.css";
import { useBlueBird } from "../../../contexts/AppContext";

const valueType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool
]);

const propTypes = {
  labels: PropTypes.shape({
    left: {
      title: PropTypes.string.isRequired,
      value: valueType
    },
    center: {
      title: PropTypes.string.isRequired,
      value: valueType
    },
    right: {
      title: PropTypes.string.isRequired,
      value: valueType
    }
  }),
  onChange: PropTypes.func.isRequired,
  styles: PropTypes.object
};

const defaultProps = {
  labels: {
    left: {
      title: "UAV",
      value: "left"
    },
    center: {
      title: "BOTH",
      value: "center"
    },
    right: {
      title: "GCS",
      value: "right"
    }
  },
  onChange: (value) => console.log("value:", value)
};

function TripleSwitch({ labels, onChange }) {
  const { switchPosition, setSwitchPosition } = useBlueBird();  // Use context here
  const [animation, setAnimation] = useState(null);

  const getSwitchAnimation = (value) => {
    let newAnimation = null;
    if (value === "center" && switchPosition === "left") {
      newAnimation = "left-to-center";
    } else if (value === "right" && switchPosition === "center") {
      newAnimation = "center-to-right";
    } else if (value === "center" && switchPosition === "right") {
      newAnimation = "right-to-center";
    } else if (value === "left" && switchPosition === "center") {
      newAnimation = "center-to-left";
    } else if (value === "right" && switchPosition === "left") {
      newAnimation = "left-to-right";
    } else if (value === "left" && switchPosition === "right") {
      newAnimation = "right-to-left";
    }
    onChange(value);
    setSwitchPosition(value);
    setAnimation(newAnimation);
  };

  return (
    <div className="main-container">
      <div className={`switch ${animation} ${switchPosition}-position`}></div>
      {Object.keys(labels).map((key) => (
        <React.Fragment key={key}>
          <input
            onChange={(e) => getSwitchAnimation(e.target.value)}
            name="map-switch"
            id={key}
            type="radio"
            value={labels[key].value}
            checked={switchPosition === labels[key].value}
          />
          <label
            className={`${key}-label ${switchPosition === labels[key].value ? " switch-color" : ""}`}
            htmlFor={key}
          >
            <h4>{labels[key].title}</h4>
          </label>
        </React.Fragment>
      ))}
    </div>
  );
}

TripleSwitch.propTypes = propTypes;
TripleSwitch.defaultProps = defaultProps;

export default TripleSwitch;
