import React, { useEffect, useState } from "react";
import "./fileInput.css";
import { LuUpload } from "react-icons/lu";

const FileInput = ({
  buttonText,
  fileText,
  onFileChange = () => {},
  fileType = "*",
  resetInput = false,
}) => {
  const [fileRoute, setFileRoute] = React.useState("");
  const fileInputRef = React.useRef(); // Añade esta línea

  const onChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileRoute(file.name);
      onFileChange(e);
    }
  };

  useEffect(() => {
    if (resetInput) {
      fileInputRef.current.value = "";
      setFileRoute("");
    }
  }, [resetInput]);

  return (
    <div className="fileInput">
      <label htmlFor="fileUpload" className="customFileUpload">
        <LuUpload className="uploadIcon" /> {buttonText}
      </label>
      <input
        type="file"
        id="fileUpload"
        style={{ display: "none" }}
        onChange={onChange}
        accept={fileType}
        ref={fileInputRef}
      />
      <span className="fileText">
        {fileRoute === "" ? fileText : fileRoute}
      </span>
    </div>
  );
};

export default FileInput;
