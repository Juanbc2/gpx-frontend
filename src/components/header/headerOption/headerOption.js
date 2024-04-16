import React, { useState } from "react";
import "./headerOption.css";

const HeaderOption = ({ title, mainRoute = "/", children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      style={{
        backgroundColor: isOpen && "#A7000E",
      }}
    >
      <a href={mainRoute}>{title}</a>
      {isOpen && <div className="headerDropdown">{children}</div>}
    </li>
  );
};

export default HeaderOption;
