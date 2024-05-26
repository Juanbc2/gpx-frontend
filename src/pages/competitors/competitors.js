import React, { useEffect } from "react";
import CardButton from "../../components/buttons/cardButton/cardButton";
import MainButton from "../../components/buttons/mainButton/mainButton";
import { useNavigate, useLocation } from "react-router-dom";
import EditCompetitors from "./editCompetitors/editCompetitors";
import CreateCompetitors from "./createCompetitors/createCompetitors";
import ViewCompetitors from "./viewCompetitors/viewCompetitors";
import "./competitors.css";
import { notify } from "../../utils/toastify";
import ImportCompetitorStage from "./importCompetitorStage/importCompetitorStage";

const Competitors = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSubPage, setSelectedSubPage] = React.useState("");

  useEffect(() => {
    location.state != null &&
      location.state.subPage != null &&
      setSelectedSubPage(location.state.subPage);
  }, [location]);

  const tokenVerified = localStorage.getItem("token");
  useEffect(() => {
    if (tokenVerified == null) {
      notify("error", "No tiene permisos para acceder a esta página");
      navigate("/");
    }
  }, [tokenVerified]);

  return (
    <div>
      {selectedSubPage === "" && (
        <div>
          <div className="title">
            <h1>Gestión de competidores</h1>
          </div>
          <div className="options">
            <CardButton
              title="Crear competidores"
              description="Crea un competidor nuevo, al cual se le pueden asignar gpx más adelante"
              onClick={() => setSelectedSubPage("create")}
            />
            <CardButton
              title="Subir etapa de competidor"
              description="Sube un archivo gpx para un competidor ya creado"
              onClick={() => setSelectedSubPage("import")}
            />
            <CardButton
              title="Editar competidores"
              description="Edición de competidores creados anteriormente"
              onClick={() => setSelectedSubPage("edit")}
            />
            <CardButton
              title="Visualización de competidores"
              description="Visualización de competidores creados anteriormente"
              onClick={() => setSelectedSubPage("view")}
            />
          </div>
          <div className="content">
            <MainButton text="Atrás" onClick={() => navigate("/dashboard")} />
          </div>
        </div>
      )}

      <div className="content">
        {selectedSubPage === "create" && <CreateCompetitors />}
        {selectedSubPage === "import" && <ImportCompetitorStage />}
        {selectedSubPage === "edit" && <EditCompetitors />}
        {selectedSubPage === "view" && <ViewCompetitors />}
      </div>
    </div>
  );
};

export default Competitors;
