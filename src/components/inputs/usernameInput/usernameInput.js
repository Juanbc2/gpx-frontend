import React from "react";
import "./usernameInput.css";

const UsernameInput = ({ title, placeholder, onChange, value }) => {
  return (
    <div className="usernameInput">
      <span className="inputLabel">{title}</span>
      <div className="usernameInputBox">
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

export default UsernameInput;
