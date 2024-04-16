import React, { useEffect } from "react";
import CardButton from "../../components/buttons/cardButton/cardButton";
import MainButton from "../../components/buttons/mainButton/mainButton";
import { useNavigate, useLocation } from "react-router-dom";
import EditEvent from "./editEvent/editEvent";
import CreateEvent from "./createEvent/createEvent";
import ViewEvents from "./viewEvents/viewEvents";
import "./events.css";

const Events = () => {
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
              onClick={() => setSelectedSubPage("view")}
            />
          </div>
          <div className="content">
            <MainButton text="Atrás" onClick={() => navigate("/")} />
          </div>
        </div>
      )}

      <div className="content">
        {selectedSubPage === "import" && <CreateEvent />}
        {selectedSubPage === "edit" && <EditEvent />}
        {selectedSubPage === "view" && <ViewEvents />}
      </div>
    </div>
  );
};

export default Events;
