import React from "react";
import "./textInput.css";

const TextInput = ({ title, placeholder, onChange, value }) => {
  return (
    <div className="textInput">
      <span className="inputLabel">{title}</span>
      <div className="textInputBox">
        <input
          placeholder={placeholder}
          type="text"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TextInput;
