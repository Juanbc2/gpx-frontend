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

const ImportCompetitorStage = () => {
  const handleImport = () => {
    let readyToImport = true;
    if (loadedPath.length === 0) {
      notify("warning", "Cargue un archivo gpx.");
      return (readyToImport = false);
    }
    if (!selectedStage) {
      notify("warning", "Seleccione una etapa.");
      return (readyToImport = false);
    }

    if (!selectedCompetitor) {
      notify("warning", "Seleccione un competidor.");
      return (readyToImport = false);
    }

    if (readyToImport) {
      let gpxData = {
        filePath: loadedPath,
        competitorId: selectedCompetitor,
        stageId: selectedStage,
      };
      let result = analyzeCompetitorGpxApi(gpxData);
      if (result !== null) {
        notify("success", "Etapa importada correctamente.");
        resetConstants();
      } else {
        notify("error", "Error al importar la etapa.");
      }
    }
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

  const [selectedStage, setSelectedStage] = useState(null);
  const [stages, setStages] = useState([]);

  const getStages = useCallback(async () => {
    let result = await getStagesApi();
    if (result != null) {
      let stages = result.map((stage) => {
        return {
          value: stage.id,
          text: stage.details,
          waypoints: stage.waypoints,
        };
      });
      setStages(stages);
    } else {
      notify("warning", "No se encontraron etapas.");
    }
  }, []);

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
    getStages();
  }, [getStages, getCompetitors]);

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
          title="Etapa"
          value={selectedStage}
          onChange={(e) => setSelectedStage(e.target.value)}
          options={stages}
        />
      </div>
      <div className="content">
        <MainButton text="Importar" onClick={handleImport} />
      </div>
    </div>
  );
};

export default ImportCompetitorStage;
