import React, { useEffect } from "react";
import "./header.css";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HeaderOption from "./headerOption/headerOption";
import { LuLogIn } from "react-icons/lu";

const Header = () => {
  const navigate = useNavigate();

  const tokenVerified = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="header">
      <div className="brand" onClick={() => navigate("/")}>
        <h1>DARIEN</h1>
        <hr></hr>
        <h3>RALLY ANALYZER</h3>
      </div>
      <div>
        <ul className="menu">
          <HeaderOption title="Eventos" mainRoute="/events">
            <span
              onClick={() => {
                navigate("/events", {
                  state: { subPage: "import" },
                });
              }}
            >
              Crear evento
            </span>
            <span
              onClick={() => {
                navigate("/events", {
                  state: { subPage: "edit" },
                });
              }}
            >
              Editar eventos
            </span>
            <span
              onClick={() => {
                navigate("/events", {
                  state: { subPage: "view" },
                });
              }}
            >
              Visualización de eventos
            </span>
          </HeaderOption>

          <HeaderOption title="Etapas" mainRoute="/stages">
            <span
              onClick={() => {
                navigate("/stages", {
                  state: { subPage: "import" },
                });
              }}
            >
              Importar etapas
            </span>
            <span
              onClick={() => {
                navigate("/stages", {
                  state: { subPage: "edit" },
                });
              }}
            >
              Editar etapas
            </span>
            <span
              onClick={() => {
                navigate("/stages", {
                  state: { subPage: "view" },
                });
              }}
            >
              Ver etapas
            </span>
          </HeaderOption>
          <li>
            <a href="/drivers">Corredores</a>
          </li>
          <li>
            <a href="/results">Resultados</a>
          </li>
        </ul>
      </div>
      {tokenVerified ? (
        <div className="outButton" onClick={handleLogout}>
          Salir <FaArrowRight size={15} />
        </div>
      ) : (
        <div className="outButton" onClick={() => navigate("/")}>
          Iniciar Sesión <LuLogIn size={15} />
        </div>
      )}
    </div>
  );
};

export default Header;
