import React, { useEffect } from "react";
import "./viewWaypoint.css";
import InfoTable from "../../../components/tables/infoTable/infoTable";
import MainButton from "../../../components/buttons/mainButton/mainButton";

const ViewWaypoint = ({ stage, onClose }) => {
  const [waypoints, setWaypoints] = React.useState([]);

  useEffect(() => {
    setWaypoints(stage.waypoints);
    // eslint-disable-next-line
  }, [stage]);

  return (
    <div>
      <h1 className="title">Visualización de waypoints</h1>
      <div className="group">
        <MainButton text="Atrás" onClick={onClose} />
      </div>
      <div className="content">
        <InfoTable
          title={stage.details}
          columns={[
            "wpnumber",
            "latitude",
            "longitude",
            "type",
            "distance",
            "speed",
            "penalization",
            "ratius",
          ]}
          columnsNames={[
            "N°",
            "Latitud",
            "Longitud",
            "Tipo",
            "Distancia",
            "Velocidad",
            "Penalización",
            "Radio",
          ]}
          rows={waypoints}
        />
      </div>
    </div>
  );
};

export default ViewWaypoint;
