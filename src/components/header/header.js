import React from "react";
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
      <div
        className="brand"
        onClick={() => tokenVerified && navigate("/dashboard")}
      >
        <h1>DARIEN</h1>
        <hr></hr>
        <h3>RALLY ANALYZER</h3>
      </div>
      {tokenVerified && (
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
                Crear etapas
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
            <HeaderOption title="Competidores" mainRoute="/drivers">
              <span
                onClick={() => {
                  navigate("/drivers", {
                    state: { subPage: "create" },
                  });
                }}
              >
                Crear competidores
              </span>
              <span
                onClick={() => {
                  navigate("/drivers", {
                    state: { subPage: "import" },
                  });
                }}
              >
                Importar GPX
              </span>
              <span
                onClick={() => {
                  navigate("/drivers", {
                    state: { subPage: "edit" },
                  });
                }}
              >
                Editar competidores
              </span>
              <span
                onClick={() => {
                  navigate("/drivers", {
                    state: { subPage: "view" },
                  });
                }}
              >
                Ver competidores
              </span>
            </HeaderOption>
            <HeaderOption title="Vehículos" mainRoute="/vehicles">
              <span
                onClick={() => {
                  navigate("/vehicles", {
                    state: { subPage: "create" },
                  });
                }}
              >
                Crear vehículos
              </span>
              <span
                onClick={() => {
                  navigate("/vehicles", {
                    state: { subPage: "edit" },
                  });
                }}
              >
                Editar vehículos
              </span>
              <span
                onClick={() => {
                  navigate("/vehicles", {
                    state: { subPage: "view" },
                  });
                }}
              >
                Ver vehículos
              </span>
              <span
                onClick={() => {
                  navigate("/vehicles", {
                    state: { subPage: "categories" },
                  });
                }}
              >
                Categorías de vehículos
              </span>
            </HeaderOption>
            <HeaderOption
              title="Resultados"
              mainRoute="/results"
            ></HeaderOption>
            {/* temporal */}
          </ul>
        </div>
      )}
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
