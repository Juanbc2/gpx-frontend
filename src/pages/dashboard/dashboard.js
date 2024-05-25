import React, { useEffect } from "react";
import CardButton from "../../components/buttons/cardButton/cardButton";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import { notify } from "../../utils/toastify";

const Dashboard = () => {
  const navigate = useNavigate();

  const tokenVerified = localStorage.getItem("token");

  useEffect(() => {
    if (tokenVerified == null) {
      notify("error", "No tiene permisos para acceder a esta página");
      navigate("/");
    }
  }, [tokenVerified]);

  return (
    <div>
      <div className="title">
        <h1>Bienvenido</h1>
        <h4>¿Qué desea hacer?</h4>
      </div>
      <div className="options">
        <CardButton
          title="Gestión de Eventos"
          description="Gestionar los eventos del DARIEN, que corresponde a las competencias de rally"
          onClick={() => navigate("/events")}
        />
        <CardButton
          title="Gestión de Etapas"
          description="Gestionar las etapas de la competencia, como importar y editar las matrices de las etapas"
          onClick={() => navigate("/stages")}
        />
        <CardButton
          title="Gestión Competidores"
          description="Gestionar los competidores de la competencia, como importar y editar los competidores"
          onClick={() => navigate("/drivers")}
        />
        <CardButton
          title="Gestión de Vehículos"
          description="Gestionar los vehículos de la competencia, como crear y editar los vehículos"
          onClick={() => navigate("/vehicles")}
        />
        <CardButton
          title="Gestión de Resultados"
          description="Gestionar los resultados de la competencia, como importar y editar los resultados"
          onClick={() => navigate("/results")}
        />
      </div>
    </div>
  );
};

export default Dashboard;
