import React from "react";
import "./simpleSelect.css";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";

const SimpleSelect = ({
  title,
  selectedOption = null,
  defaultOptionText = "Seleccione una opción...",
  options,
  onChange = () => {},
}) => {
  const [selected, setSelected] = useState(selectedOption);
  const handleChange = (event) => {
    setSelected(event.target.value);
    onChange();
  };

  return (
    <div className="simpleSelect">
      <span className="inputLabel">{title}</span>
      <div className="selectBox">
        <label className="arrowDown">
          <FaArrowDown color="white" />
        </label>
        <select value={selected} onChange={handleChange}>
          <option value="" disabled selected>
            {selectedOption ? selectedOption : defaultOptionText}
          </option>
          {options.map((option) => (
            <option value={option.value}>{option.text}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SimpleSelect;
