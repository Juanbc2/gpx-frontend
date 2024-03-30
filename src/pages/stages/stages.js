import React from "react";
import ImportStages from "./importStage/importStages";
import CardButton from "../../components/buttons/cardButton/cardButton";
import EditStages from "./editStage/editStages";
import MainButton from "../../components/buttons/mainButton/mainButton";
import { useNavigate } from "react-router-dom";

const Stages = () => {
  const navigate = useNavigate();
  const [selectedSubPage, setSelectedSubPage] = React.useState(null);

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
          </div>
          <div className="content">
            <MainButton text="Atrás" onClick={() => navigate("/")} />
          </div>
        </div>
      )}

      <div className="content">
        {selectedSubPage === "import" && <ImportStages />}
        {selectedSubPage === "edit" && <EditStages />}
      </div>
    </div>
  );
};

export default Stages;
