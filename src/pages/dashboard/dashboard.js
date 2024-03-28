import React from "react";
import CardButton from "../../components/buttons/cardButton/cardButton";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="title">
        <h1>Bienvenido</h1>
        <h4>¿Qué desea hacer?</h4>
      </div>
      <div className="options">
        <CardButton
          title="Importar Matrices"
          description="Carga de archivos XSLX de cada categoría"
          onClick={() => navigate("/import")}
        />
        <CardButton
          title="Importar Matrices"
          description="Carga de archivos XSLX de cada categoría"
          onClick={() => navigate("/import")}
        />
        <CardButton
          title="Importar Matrices"
          description="Carga de archivos XSLX de cada categoría"
          onClick={() => navigate("/import")}
        />
        <CardButton
          title="Importar Matrices"
          description="Carga de archivos XSLX de cada categoría"
          onClick={() => navigate("/import")}
        />
        <CardButton
          title="Importar Matrices"
          description="Carga de archivos XSLX de cada categoría"
          onClick={() => navigate("/import")}
        />
        <CardButton
          title="Importar Matrices"
          description="Carga de archivos XSLX de cada categoría"
          onClick={() => navigate("/import")}
        />
      </div>
    </div>
  );
};

export default Dashboard;
