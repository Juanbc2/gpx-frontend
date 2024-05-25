import React, { useCallback, useEffect, useState } from "react";
import "./importCompetitorStage.css";
import FileInput from "../../../components/inputs/fileInput/fileInput";
import MainButton from "../../../components/buttons/mainButton/mainButton";
import { notify } from "../../../utils/toastify";
import SimpleSelect from "../../../components/selects/simpleSelect/simpleSelect";
import { analyzeCompetitorGpxApi } from "../../../services/api/competitors";
import InfoTable from "../../../components/tables/infoTable/infoTable";
import { getTypeKeyByValue } from "../../../utils/functions";
import { getEventsWithStagesApi } from "../../../services/api/events";
import { getVehiclesApi } from "../../../services/api/vehicles";

const ImportCompetitorStage = () => {
  const [analyzingCompetitorGpxApi, setAnalyzingCompetitorGpxApi] =
    useState(false);

  const [importedData, setImportedData] = useState(null);
  const handleImport = async () => {
    let readyToImport = true;
    if (loadedPath === "") {
      notify("warning", "Cargue un archivo gpx.");
      return (readyToImport = false);
    }

    if (!selectedVehicle) {
      notify("warning", "Seleccione un vehículo.");
      return (readyToImport = false);
    }

    if (!selectedEvent) {
      notify("warning", "Seleccione un evento.");
      return (readyToImport = false);
    }

    if (!selectedStage) {
      notify("warning", "Seleccione una etapa.");
      return (readyToImport = false);
    }

    if (readyToImport) {
      setAnalyzingCompetitorGpxApi(true);
      let gpxData = {
        filePath: loadedPath,
        vehicleId: parseInt(selectedVehicle),
        stageId: parseInt(selectedStage),
      };
      let result = await analyzeCompetitorGpxApi(gpxData);
      if (result !== null) {
        let imported = JSON.parse(result);
        imported.competitor = getTypeKeyByValue(
          vehicles,
          "text",
          parseInt(selectedVehicle)
        );
        imported.stage = getTypeKeyByValue(
          stages,
          "text",
          parseInt(selectedStage)
        );
        setImportedData(imported);
        notify("success", "Etapa importada correctamente.");
        resetConstants();
      } else {
        notify("error", "Error al importar la etapa.");
      }
    }
    setAnalyzingCompetitorGpxApi(false);
  };

  const [resetFileInput, setResetFileInput] = useState(false);
  const handleResetFileInput = () => {
    setResetFileInput(true);
    setTimeout(() => {
      setResetFileInput(false);
    }, 500);
  };
  const resetConstants = () => {
    setLoadedPath("");
    setSelectedVehicle(null);
    setSelectedStage(null);
    handleResetFileInput();
  };

  const [loadedPath, setLoadedPath] = useState("");

  const handleFileChange = ($event) => {
    const file = $event.target.files[0];
    if (file) {
      const filePath = file.path;
      setLoadedPath(filePath);
    }
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

  return (
    <div>
      <h1 className="title">Importe de GPX</h1>
      <div>
        <FileInput
          fileText="Seleccione el archivo GPX del recorrido"
          buttonText="Subir GPX"
          onFileChange={handleFileChange}
          fileType=".gpx"
          resetInput={resetFileInput}
        />
      </div>
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
      </div>
      <div className="content">
        <SimpleSelect
          title="Etapa"
          value={selectedStage}
          onChange={(e) => setSelectedStage(e.target.value)}
          options={stages}
        />
      </div>
      <div className="content">
        <MainButton
          disabled={analyzingCompetitorGpxApi}
          text={analyzingCompetitorGpxApi ? "Analizando" : "Importar"}
          onClick={handleImport}
        />
      </div>
      {importedData != null && (
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
      )}
    </div>
  );
};

export default ImportCompetitorStage;
