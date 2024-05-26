import React, { useCallback, useEffect } from "react";
import "./importStages.css";
import FileInput from "../../../components/inputs/fileInput/fileInput";
import TextInput from "../../../components/inputs/textInput/textInput";
import InfoTable from "../../../components/tables/infoTable/infoTable";
import MainButton from "../../../components/buttons/mainButton/mainButton";
import { read, utils } from "xlsx";
import { notify } from "../../../utils/toastify";
import CheckboxSelect from "../../../components/selects/checkboxSelect/checkboxSelect";
import SimpleSelect from "../../../components/selects/simpleSelect/simpleSelect";
import { getEventsApi } from "../../../services/api/events";
import {
  dateToInputDate,
  decimalTimeToTime,
  getValuesFromDictionary,
  valueInArray,
} from "../../../utils/functions";
import { createStageApi } from "../../../services/api/stages";
import DateInput from "../../../components/inputs/dateInput/dateInput";
import { getCategoriesApi } from "../../../services/api/categories";

const ImportStages = () => {
  const handleImport = () => {
    let readyToImport = true;
    if (loadedMatrix.length === 0) {
      notify("warning", "Cargue una matriz.");
      return (readyToImport = false);
    }
    if (!selectedEvent) {
      notify("warning", "Seleccione un evento.");
      return (readyToImport = false);
    }

    if (!selectedCategories) {
      notify("warning", "Seleccione una categoría.");
      return (readyToImport = false);
    }

    if (readyToImport) {
      let stageData = {
        name: name,
        eventId: selectedEvent,
        details: details,
        categoriesIds: getValuesFromDictionary(selectedCategories, "value"),
        stageDate: date,
        waypoints: loadedMatrix,
      };
      let result = createStageApi(stageData);
      if (result !== null) {
        notify("success", "Etapa importada correctamente.");
        resetConstants();
      } else {
        notify("error", "Error al importar la etapa.");
      }
    }
  };

  const resetConstants = () => {
    setLoadedMatrix([]);
    setSelectedEvent(null);
    setEventCategories([]);
    setDetails("");
    setDate(dateToInputDate(new Date()));
    setSelectedCategories(null);
  };

  const [loadedMatrix, setLoadedMatrix] = React.useState([]);

  const handleFileChange = ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = async (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          try {
            const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
            let loadedInfo = getLoadedInfo(rows);
            setLoadedMatrix(loadedInfo);
          } catch (e) {
            notify(
              "error",
              "Verifique que el nombre de todas las columnas sea correcto."
            );
          }
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const getLoadedInfo = (rows) => {
    let stages = [];
    rows.map((row) => {
      return stages.push({
        wpnumber: row["wpnumber"],
        latitude: row["latitude"],
        longitude: row["longitude"],
        type: row["type"],
        distance: row["distance"],
        speed: row["speed"],
        penalization: decimalTimeToTime(row["penalization"]),
        ratius: row["ratius"],
        neutralization: decimalTimeToTime(row["neutralizationT"]),
      });
    });
    return stages;
  };

  const [eventCategories, setEventCategories] = React.useState([]);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [events, setEvents] = React.useState([]);
  const [name, setName] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [date, setDate] = React.useState(dateToInputDate(new Date()));

  const getEvents = useCallback(async () => {
    let result = await getEventsApi();
    if (result != null) {
      let events = result.map((event) => {
        return {
          value: event.id,
          text: event.name,
          categoriesIds: event.categoriesIds,
        };
      });
      setEvents(events);
    } else {
      notify("warning", "No se pudieron cargar los eventos.");
    }
  }, []);

  const [categories, setCategories] = React.useState([]);
  const getCategories = async () => {
    const result = await getCategoriesApi();
    if (result != null) {
      setCategories(result);
    } else notify("warning", "Error al obtener las categorías.");
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSelectedEvent = (value) => {
    let event = events.find((event) => {
      return event.value === parseInt(value);
    });
    if (event === undefined) return notify("warning", "Evento no encontrado.");
    let categories = setCategoriesOptions(event.categoriesIds);
    if (categories.length === 0)
      return notify("warning", "El evento no tiene categorías asignadas.");
    setSelectedEvent(value);
    setEventCategories(categories);
  };

  const setCategoriesOptions = (categoriesIds) => {
    let categoriesOptions = [];
    categoriesIds.map((categoryId) => {
      let category = valueInArray(categoryId, categories, "id");
      if (category !== undefined) {
        categoriesOptions.push({
          value: category.id,
          text: category.name,
          checked: false,
        });
      }
      return null;
    });
    return categoriesOptions;
  };

  const [selectedCategories, setSelectedCategories] = React.useState(null);

  const handleSelectedCategories = (values) => {
    setSelectedCategories(values);
  };

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <div>
      <h1 className="title">Importe de matriz de etapa</h1>
      <div>
        <FileInput
          fileText="Seleccione el archivo XLSX de su matriz"
          buttonText="Subir Matriz"
          onFileChange={handleFileChange}
          fileType=".xlsx"
        />
      </div>
      <div className="content">
        <TextInput
          title="Nombre"
          placeholder="Nombre de la etapa"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <TextInput
          title="Detalles"
          placeholder="Detalles de la etapa"
          onChange={(e) => setDetails(e.target.value)}
          value={details}
        />
      </div>
      <div className="content">
        <SimpleSelect
          title="Evento"
          value={selectedEvent}
          onChange={(e) => handleSelectedEvent(e.target.value)}
          options={events}
        />
        <CheckboxSelect
          title="Categoría"
          defaultOptionText="Seleccione una(s) categoría(s)..."
          options={eventCategories}
          onChange={handleSelectedCategories}
        />
      </div>
      <div className="content">
        <DateInput
          title="Fecha"
          onChange={(event) => {
            setDate(event.target.value);
          }}
          value={date}
        />
      </div>
      <div className="content">
        <MainButton text="Importar" onClick={handleImport} />
      </div>
      <div className="content">
        <InfoTable
          title="Matriz"
          columns={[
            "wpnumber",
            "latitude",
            "longitude",
            "type",
            "distance",
            "speed",
            "penalization",
            "ratius",
            "neutralization",
          ]}
          columnsNames={[
            "Waypoint",
            "Latitud",
            "Longitud",
            "Tipo",
            "Distancia",
            "Velocidad",
            "Penalización",
            "Radio",
            "T. Neutralización",
          ]}
          rows={loadedMatrix}
        />
      </div>
    </div>
  );
};

export default ImportStages;
