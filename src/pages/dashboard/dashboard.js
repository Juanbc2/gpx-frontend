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
          title="Gestión Corredores"
          description="Gestionar los corredores de la competencia, como importar y editar los corredores"
          onClick={() => navigate("/drivers")}
        />
      </div>
    </div>
  );
};

export default Dashboard;
