import React from "react";
import "./cardButton.css";
const CardButton = ({ title, description, onClick }) => {
  return (
    <button className="cardButton" onClick={onClick}>
      <h2>{title}</h2>
      <h4>{description}</h4>
    </button>
  );
};

export default CardButton;
