import React from "react";
import ImportStages from "./importStage/importStages";
import CardButton from "../../components/buttons/cardButton/cardButton";
import EditStages from "./editStage/editStages";
import MainButton from "../../components/buttons/mainButton/mainButton";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();
  const [selectedSubPage, setSelectedSubPage] = React.useState(null);

  return (
    <div>
      {selectedSubPage === null && (
        <div>
          <div className="title">
            <h1>Gestión de eventos</h1>
          </div>
          <div className="options">
            <CardButton
              title="Crear evento"
              description="Crea un evento nuevo, al cual se le pueden asignar etapas más adelante"
              onClick={() => setSelectedSubPage("import")}
            />
            <CardButton
              title="Editar eventos"
              description="Edición de eventos creados anteriormente"
              onClick={() => setSelectedSubPage("edit")}
            />
            <CardButton
              title="Visualización de eventos"
              description="Visualización de eventos creados anteriormente"
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

export default Events;
