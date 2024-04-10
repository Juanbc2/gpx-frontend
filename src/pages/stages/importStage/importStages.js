import React from "react";
import "./importStages.css";
import FileInput from "../../../components/inputs/fileInput/fileInput";
import TextInput from "../../../components/inputs/textInput/textInput";
import InfoTable from "../../../components/tables/infoTable/infoTable";
import MainButton from "../../../components/buttons/mainButton/mainButton";
import { read, utils } from "xlsx";
import { notify } from "../../../utils/toastify";
import { categories } from "../../../services/data/frontInfo";
import CheckboxSelect from "../../../components/selects/checkboxSelect/checkboxSelect";

const ImportStages = () => {
  const handleImport = () => {
    let readyToImport = true;
    if (loadedMatrix.length === 0) {
      notify("warning", "Cargue una matriz.");
      return (readyToImport = false);
    }
    if (!selectedCategories) {
      notify("warning", "Seleccione una categoría.");
      return (readyToImport = false);
    }

    if (readyToImport) {
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

  const [selectedCategories, setSelectedCategories] = React.useState(null);

  const handleSelectedCategories = (values) => {
    setSelectedCategories(values);
  };

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
        <CheckboxSelect
          title="Categoría"
          defaultOptionText="Seleccione una(s) categoría(s)..."
          options={categories}
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
