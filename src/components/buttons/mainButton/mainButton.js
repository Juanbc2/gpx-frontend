import React from "react";
import "./mainButton.css";
const MainButton = ({ text, onClick }) => {
  return (
    <button className="mainButton" onClick={onClick}>
      {text}
    </button>
  );
};

export default MainButton;
