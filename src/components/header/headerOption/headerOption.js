import React, { useState } from "react";
import "./headerOption.css";
import { useNavigate } from "react-router-dom";

const HeaderOption = ({ title, mainRoute = "/", children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <li
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      style={{
        backgroundColor: isOpen && "#A7000E",
      }}
    >
      <span onClick={() => navigate(mainRoute, { state: { subPage: "" } })}>
        {title}
      </span>
      {isOpen && <div className="headerDropdown">{children}</div>}
    </li>
  );
};

export default HeaderOption;
