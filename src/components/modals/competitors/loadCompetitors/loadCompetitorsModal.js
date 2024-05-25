import Modal from "@mui/material/Modal";
import { useState } from "react";
import { notify } from "../../../../utils/toastify";
import { bulkCreateCompetitorsApi } from "../../../../services/api/competitors";
import { read, utils } from "xlsx";
import FileInput from "../../../inputs/fileInput/fileInput";
import MainButton from "../../../buttons/mainButton/mainButton";
import "./loadCompetitorsModal.css";

const LoadCompetitorsModal = ({ open, handleClose }) => {
  const [loadedCompetitors, setLoadedCompetitors] = useState([]);

  const handleImport = () => {
    if (loadedCompetitors.length === 0) {
      notify("warning", "Cargue una matriz.");
      return;
    }
    let result = bulkCreateCompetitorsApi(loadedCompetitors);
    if (result !== null) {
      notify("success", "Competidores importados correctamente.");
      handleClose();
    } else {
      notify("error", "Error al importar los competidores.");
    }
  };

  const getLoadedInfo = (rows) => {
    let competitors = [];
    rows.map((row) => {
      return competitors.push({
        name: row["name"],
        lastName: row["lastname"],
        number: row["number"].toString(),
        identification: row["identification"].toString(),
      });
    });
    return competitors;
  };

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
            setLoadedCompetitors(loadedInfo);
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

  return (
    <div>
      <Modal open={open} onClose={handleClose} className="Modal">
        <div className="modalBody">
          <div>
            <h1>Carga de competidores</h1>
          </div>
          <div>
            <div>
              <FileInput
                fileText="Seleccione el archivo XLSX de su matriz"
                buttonText="Subir Matriz"
                onFileChange={handleFileChange}
                fileType=".xlsx"
              />
            </div>
            <div className="content">
              <MainButton text="Importar" onClick={handleImport} />
              <MainButton text="Cancelar" onClick={handleClose} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoadCompetitorsModal;
