import React from "react";
import "./dateInput.css";

const DateInput = ({ title, onChange, value }) => {
  return (
    <div className="dateInput">
      <span className="inputLabel">{title}</span>
      <div className="dateInputBox">
        <input type="date" onChange={onChange} value={value}  />
      </div>
    </div>
  );
};

export default DateInput;
