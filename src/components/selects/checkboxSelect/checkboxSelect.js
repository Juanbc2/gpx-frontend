import React, { useEffect, useState } from "react";
import "./checkboxSelect.css";
import { FaArrowDown } from "react-icons/fa";

const CheckboxSelect = ({
  title,
  defaultOptionText = "Seleccione una opción...",
  options,
  onChange = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const [checkedOptions, setCheckedOptions] = useState([]);
  useEffect(() => {
    let newCheckedOptions = options.map((option) => {
      return { value: option.value, text: option.text, checked: false };
    });
    setCheckedOptions(newCheckedOptions);
  }, [options]);

  const handleOptionChecked = (option) => {
    let newCheckedOptions = [...checkedOptions];
    newCheckedOptions.find((opt) => opt.value === option.value).checked =
      !option.checked;
    setCheckedOptions(newCheckedOptions);
    onChange(newCheckedOptions.filter((opt) => opt.checked));
  };

  return (
    <div
      className="checkboxSelect"
      onMouseLeave={() => {
        setIsOpen(false);
      }}
    >
      <span className="inputLabel">{title}</span>
      <div className="listBox" onClick={toggleOpen}>
        <div className="arrowDown">
          <FaArrowDown color="white" />
        </div>
        <label>
          {checkedOptions.filter((co) => co.checked).length > 0
            ? `[${
                checkedOptions.filter((co) => co.checked).length
              }] ${title}(s)`
            : defaultOptionText}
        </label>
      </div>
      {isOpen && (
        <div className="checkboxOptions">
          {checkedOptions.map((option, index) => (
            <label key={index} onClick={() => handleOptionChecked(option)}>
              <input type="checkbox" checked={option.checked} readOnly />
              {option.text}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxSelect;
