import React, { useEffect } from "react";
import ImportStages from "./importStage/importStages";
import CardButton from "../../components/buttons/cardButton/cardButton";
import EditStages from "./editStage/editStages";
import MainButton from "../../components/buttons/mainButton/mainButton";
import { useNavigate } from "react-router-dom";
import ViewStages from "./viewStage/viewStages";
import { useLocation } from "react-router-dom";

const Stages = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSubPage, setSelectedSubPage] = React.useState(null);

  useEffect(() => {
    location.state != null &&
      location.state.subPage != null &&
      setSelectedSubPage(location.state.subPage);
  }, [location]);

  return (
    <div>
      {selectedSubPage === null && (
        <div>
          <div className="title">
            <h1>Gestión de etapas</h1>
          </div>
          <div className="options">
            <CardButton
              title="Importar etapas"
              description="Carga de archivos XLSX de cada categoría"
              onClick={() => setSelectedSubPage("import")}
            />
            <CardButton
              title="Editar etapas"
              description="Visualización de etapas cargadas como matriz"
              onClick={() => setSelectedSubPage("edit")}
            />
            <CardButton
              title="Ver etapas"
              description="Visualización de etapas cargadas como matriz"
              onClick={() => setSelectedSubPage("view")}
            />
          </div>
          <div className="content">
            <MainButton text="Atrás" onClick={() => navigate("/")} />
          </div>
        </div>
      )}

      <div className="content">
        {selectedSubPage === "import" && <ImportStages />}
        {selectedSubPage === "edit" && <EditStages />}
        {selectedSubPage === "view" && <ViewStages />}
      </div>
    </div>
  );
};

export default Stages;
