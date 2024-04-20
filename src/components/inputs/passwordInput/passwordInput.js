import React from "react";
import "./passwordInput.css";

const PasswordInput = ({ title, placeholder, onChange, value }) => {
  return (
    <div className="passwordInput">
      <span className="inputLabel">{title}</span>
      <div className="passwordInputBox">
        <input
          placeholder={placeholder}
          type="password"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default PasswordInput;
