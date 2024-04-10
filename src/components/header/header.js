import React from "react";
import "./header.css";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="brand">
        <h1 onClick={() => navigate("/")}>GPX VISOR</h1>
      </div>
      <div>
        <ul className="menu">
          <li>
            <a href="/events">Eventos</a>
          </li>
          <li>
            <a href="/stages">Etapas</a>
          </li>
          <li>
            <a href="/drivers">Corredores</a>
          </li>
          <li>
            <a href="/results">Resultados</a>
          </li>
        </ul>
      </div>
      <div>
        <a href="/">
          Salir <FaArrowRight size={15} />
        </a>
      </div>
    </div>
  );
};

export default Header;
