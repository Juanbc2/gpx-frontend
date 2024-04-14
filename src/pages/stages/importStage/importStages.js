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
import { categories } from "../../../services/data/frontInfo";
import { valueInArray } from "../../../utils/functions";

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
      // TODO: Implement the import logic with API
      notify("success", "Matriz importada correctamente.");
      resetConstants();
    }
  };

  const resetConstants = () => {
    setLoadedMatrix([]);
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
    let products = [];
    rows.map((row) => {
      return products.push({
        wpnumber: row["wpnumber"],
        latitude: row["latitude"],
        longitude: row["longitude"],
        type: row["type"],
        distance: row["distance"],
        speed: row["speed"],
        penalization: row["penalization"],
        ratius: row["ratius"],
      });
    });
    return products;
  };

  const [eventCategories, setEventCategories] = React.useState([]);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [events, setEvents] = React.useState([]);
  const getEvents = useCallback(async () => {
    let result = await getEventsApi();
    if (result !== null) {
      let events = result.map((event) => {
        return {
          value: event.id,
          text: event.name,
          categoryIds: event.categoryIds,
        };
      });
      setEvents(events);
    } else {
      notify("warning", "No se pudieron cargar los eventos.");
    }
  }, []);

  const handleSelectedEvent = (value) => {
    let event = events.find((event) => {
      return event.value === value;
    });
    if (event === undefined) return notify("warning", "Evento no encontrado.");
    let categories = setCategoriesOptions(event.categoryIds);
    if (categories.length === 0)
      return notify("warning", "El evento no tiene categorías asignadas.");
    setSelectedEvent(value);
    setEventCategories(categories);
  };

  const setCategoriesOptions = (categoriesIds) => {
    let categoriesOptions = [];
    categoriesIds.map((categoryId) => {
      let category = valueInArray(categoryId, categories);
      if (category !== undefined) {
        categoriesOptions.push({
          value: category.value,
          text: category.text,
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
      <h1 className="title">Importe de matrices</h1>
      <div>
        <FileInput
          fileText="Seleccione el archivo XLSX de su matriz"
          buttonText="Subir Matriz"
          onFileChange={handleFileChange}
          fileType=".xlsx"
        />
      </div>
      <div className="content">
        <SimpleSelect
          title="Evento"
          value={selectedEvent}
          onChange={(e) => handleSelectedEvent(e.target.value)}
          options={events}
        />
      </div>
      <div className="content">
        <CheckboxSelect
          title="Categoría"
          defaultOptionText="Seleccione una(s) categoría(s)..."
          options={eventCategories}
          onChange={handleSelectedCategories}
          value={selectedCategories}
        />
        <TextInput title="Detalles" placeholder="Detalles del evento" />
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
          ]}
          rows={loadedMatrix}
        />
      </div>
      <div className="content">
        <MainButton text="Importar" onClick={handleImport} />
      </div>
    </div>
  );
};

export default ImportStages;
