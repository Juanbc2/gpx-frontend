import React from "react";
import "./simpleSelect.css";
import { FaArrowDown } from "react-icons/fa";

const SimpleSelect = ({
  title,
  value = null,
  defaultOptionText = "Seleccione una opción...",
  options,
  onChange = () => {},
}) => {
  return (
    <div className="simpleSelect">
      <span className="inputLabel">{title}</span>
      <div className="selectBox">
        <label className="arrowDown">
          <FaArrowDown color="white" />
        </label>
        <select value={value ? value : defaultOptionText} onChange={onChange}>
          <option value={defaultOptionText} hidden>
            {defaultOptionText}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SimpleSelect;
