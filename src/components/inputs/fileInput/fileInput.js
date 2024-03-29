import React from "react";
import "./fileInput.css";
import { LuUpload } from "react-icons/lu";

const FileInput = ({ buttonText, fileText }) => {
  return (
    <div className="fileInput">
      <label htmlFor="fileUpload" className="customFileUpload">
        <LuUpload className="uploadIcon" /> {buttonText}
      </label>
      <input type="file" id="fileUpload" style={{ display: "none" }} />
      <span className="fileText">{fileText}</span>
    </div>
  );
};

export default FileInput;
