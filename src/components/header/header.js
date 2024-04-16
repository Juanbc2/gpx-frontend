import React from "react";
import "./header.css";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HeaderOption from "./headerOption/headerOption";

const Header = () => {
  const navigate = useNavigate();
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
      <div>
        <a href="/">
          Salir <FaArrowRight size={15} />
        </a>
      </div>
    </div>
  );
};

export default Header;
