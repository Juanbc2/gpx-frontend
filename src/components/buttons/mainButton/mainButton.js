import React from "react";
import "./mainButton.css";
import CircularProgress from "@mui/material/CircularProgress";

const MainButton = ({ text, onClick, disabled = false }) => {
  return (
    <button
      disabled={disabled}
      className={disabled ? "mainButtonDisabled" : "mainButton"}
      onClick={onClick}
    >
      {disabled ? <CircularProgress color="inherit" size={15} /> : null} {text}
    </button>
  );
};

export default MainButton;
