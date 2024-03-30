import React from "react";
import "./fileInput.css";
import { LuUpload } from "react-icons/lu";

const FileInput = ({
  buttonText,
  fileText,
  onFileChange = () => {},
  fileType = "*",
}) => {
  const [fileRoute, setFileRoute] = React.useState("");

  const onChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileRoute(file.name);
      onFileChange(e);
    }
  };

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
      />
      <span className="fileText">
        {fileRoute === "" ? fileText : fileRoute}
      </span>
    </div>
  );
};

export default FileInput;
