import React from "react";
import "./textInput.css";

const TextInput = ({ title }) => {
  return (
    <div className="textInput">
      <span className="inputLabel">{title}</span>
      <div className="textInputBox">
        <input placeholder="Detalles de la etapa..." type="text" />
      </div>
    </div>
  );
};

export default TextInput;
