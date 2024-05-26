import React, { useCallback, useEffect, useState } from "react";
import "./results.css";
import { getResultsByVehicleAndStageApi } from "../../services/api/results";
import { getTypeKeyByValue } from "../../utils/functions";
import { notify } from "../../utils/toastify";
import { getEventsWithStagesApi } from "../../services/api/events";
import { getVehiclesApi } from "../../services/api/vehicles";
import SimpleSelect from "../../components/selects/simpleSelect/simpleSelect";
import MainButton from "../../components/buttons/mainButton/mainButton";
import InfoTable from "../../components/tables/infoTable/infoTable";
import Maps from "../../components/maps/maps";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const [importedData, setImportedData] = useState(null);
  const getResults = async () => {
    if (!selectedVehicle) {
      notify("warning", "Seleccione un vehículo.");
      return;
    }
    if (!selectedStage) {
      notify("warning", "Seleccione una etapa.");
      return;
    }
    let result = await getResultsByVehicleAndStageApi(
      selectedVehicle,
      selectedStage
    );
    if (result !== null) {
      let imported = result;
      let competitor = getTypeKeyByValue(vehicles, "", imported.vehicleId);
      let stage = getTypeKeyByValue(stages, "", imported.stageId);
      imported.competitor = competitor.text;
      imported.stage = stage.text;
      imported.penalties = JSON.parse(imported.penalties);
      imported.route = JSON.parse(imported.route);
      setImportedData(imported);
      handleCoords(imported.route, imported.penalties);
      notify("success", "Etapa importada correctamente.");

      resetConstants();
    } else {
      notify("error", "Error al importar la etapa.");
    }
  };

  const resetConstants = () => {
    setSelectedVehicle(null);
    setSelectedStage(null);
  };

  const [coords, setCoords] = useState([]);
  const [userCoords, setUserCoords] = useState([]);

  const handleCoords = (route) => {
    let coords = [];
    let userCoords = [];
    route.forEach((point) => {
      coords.push({
        lat: parseFloat(point["Coor (Lat)"]),
        lng: parseFloat(point["Coor (Lon)"]),
        radius: parseFloat(point["Radio"]),
      });
      userCoords.push({
        lat: parseFloat(point["CoorUS (Lat)"]),
        lng: parseFloat(point["CoorUS (Lon)"]),
      });
    });
    setCoords(coords);
    setUserCoords(userCoords);
  };

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);
  const [events, setEvents] = useState([]);
  const [stages, setStages] = useState([]);
  const getEvents = useCallback(async () => {
    let result = await getEventsWithStagesApi();
    if (result != null) {
      let events = result.map((event) => {
        let stages = event.stages.map((stage) => {
          return {
            value: stage.id,
            text: stage.name,
          };
        });
        return {
          value: event.id,
          text: event.details,
          stages: stages,
        };
      });
      setEvents(events);
    } else {
      notify("warning", "No se encontraron etapas.");
    }
  }, []);

  const handleSelectEvent = (eventId) => {
    setSelectedEvent(eventId);
    let event = events.find((event) => event.value === parseInt(eventId));
    setStages(event.stages);
  };

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const getVehicles = useCallback(async () => {
    let result = await getVehiclesApi();
    if (result != null) {
      let vehicles = result.map((vehicle) => {
        return {
          value: vehicle.id,
          text:
            vehicle.competitor.name +
            " " +
            vehicle.competitor.lastName +
            " - [" +
            vehicle.plate +
            "] - " +
            vehicle.brand +
            " " +
            vehicle.model,
        };
      });
      setVehicles(vehicles);
    } else {
      notify("warning", "No se encontraron vehículos.");
    }
  }, []);
  useEffect(() => {
    getVehicles();
    getEvents();
  }, [getEvents, getVehicles]);

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
      <h1 className="title">Búsqueda de Resultados</h1>
      <div className="content"></div>
      <div className="content">
        <SimpleSelect
          title="Competidor/Vehículo"
          value={selectedVehicle}
          onChange={(e) => setSelectedVehicle(e.target.value)}
          options={vehicles}
        />
        <SimpleSelect
          title="Evento"
          value={selectedEvent}
          onChange={(e) => handleSelectEvent(e.target.value)}
          options={events}
        />
        <SimpleSelect
          title="Etapa"
          value={selectedStage}
          onChange={(e) => setSelectedStage(e.target.value)}
          options={stages}
        />
      </div>
      <div className="content">
        <MainButton text="Buscar" onClick={getResults} />
      </div>
      {importedData != null && (
        <div>
          <div className="results">
            <h1>Información de la etapa</h1>
            <span>
              <b>Competidor:</b> {importedData.competitor}
            </span>
            <span>
              <b>Etapa:</b> {importedData.stage}
            </span>
            <span>
              <b>Tiempo sin penalización:</b> {importedData.penaltieTime}
            </span>
            <span>
              <b>Tiempo total:</b> {importedData.routeTime}
            </span>
            <InfoTable
              title="Penalizaciones"
              columns={[
                "wpnumber",
                "Causa",
                "Coor (Lat)",
                "Coor (Lon)",
                "CoorUS (Lat)",
                "CoorUS (Lon)",
                "Penalizacion",
                "Penalizacion Total",
                "Valor Esperado",
                "Valor Usuario",
              ]}
              columnsNames={[
                "Waypoint",
                "Causa",
                "Coor (Lat)",
                "Coor (Lon)",
                "CoorUS (Lat)",
                "CoorUS (Lon)",
                "Penalización",
                "Penalización Total",
                "Valor Esperado",
                "Valor Usuario",
              ]}
              rows={importedData.penalties}
            />
            <div
              style={{
                height: "450px",
                width: "70%",
                margin: "auto",
                marginBottom: "100px",
              }}
            >
              <h2>Mapa</h2>
              <Maps coords={coords} userCoords={userCoords} />
            </div>
            <InfoTable
              title="Ruta"
              columns={[
                "wpnumber",
                "Coor (Lat)",
                "Coor (Lon)",
                "CoorUS (Lat)",
                "CoorUS (Lon)",
                "Radio",
              ]}
              columnsNames={[
                "Waypoint",
                "Coor (Lat)",
                "Coor (Lon)",
                "CoorUS (Lat)",
                "CoorUS (Lon)",
                "Radio",
              ]}
              rows={importedData.route}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
