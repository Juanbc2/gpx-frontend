import React, { useCallback, useEffect, useState } from "react";
import "./importCompetitorStage.css";
import FileInput from "../../../components/inputs/fileInput/fileInput";
import MainButton from "../../../components/buttons/mainButton/mainButton";
import { notify } from "../../../utils/toastify";
import SimpleSelect from "../../../components/selects/simpleSelect/simpleSelect";
import { getStagesApi } from "../../../services/api/stages";
import {
  analyzeCompetitorGpxApi,
  getCompetitorsApi,
} from "../../../services/api/competitors";
import InfoTable from "../../../components/tables/infoTable/infoTable";
import { getTypeKeyByValue } from "../../../utils/functions";
import { getEventsApi } from "../../../services/api/events";

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

    if (!selectedCompetitor) {
      notify("warning", "Seleccione un competidor.");
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
        competitorId: selectedCompetitor,
        stageId: selectedStage,
      };
      let result = await analyzeCompetitorGpxApi(gpxData);
      if (result !== null) {
        let imported = JSON.parse(result);
        imported.competitor = getTypeKeyByValue(
          competitors,
          "",
          selectedCompetitor
        );
        imported.stage = getTypeKeyByValue(stages, "", selectedStage);
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
    setSelectedCompetitor(null);
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
    let result = await getEventsApi();
    if (result != null) {
      let events = result.map((event) => {
        let stages = event.stages.map((stage) => {
          return {
            value: stage.stageId,
            text: stage.stageDetails,
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
    let event = events.find((event) => event.value === eventId);
    setStages(event.stages);
  };

  const [competitors, setCompetitors] = useState([]);
  const [selectedCompetitor, setSelectedCompetitor] = useState(null);
  const getCompetitors = useCallback(async () => {
    let result = await getCompetitorsApi();
    if (result != null) {
      let competitors = result.map((competitor) => {
        return {
          value: competitor.id,
          text: competitor.name + " " + competitor.lastName,
        };
      });
      setCompetitors(competitors);
    } else {
      notify("warning", "No se encontraron competidores.");
    }
  }, []);
  useEffect(() => {
    getCompetitors();
    getEvents();
  }, [getEvents, getCompetitors]);

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
          title="Competidor"
          value={selectedCompetitor}
          onChange={(e) => setSelectedCompetitor(e.target.value)}
          options={competitors}
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
            <b>Competidor:</b> {importedData.competitor.text}
          </span>
          <span>
            <b>Etapa:</b> {importedData.stage.text}
          </span>
          <span>
            <b>Tiempo sin penalización:</b> {importedData.tiempoCarrera}
          </span>
          <span>
            <b>Tiempo total:</b> {importedData.total}
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
            rows={importedData.penalizacion}
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
            rows={importedData.ruta}
          />
        </div>
      )}
    </div>
  );
};

export default ImportCompetitorStage;
