import React from "react";
import "./importStages.css";
import FileInput from "../../../components/inputs/fileInput/fileInput";
import SimpleSelect from "../../../components/selects/simpleSelect/simpleSelect";
import TextInput from "../../../components/inputs/textInput/textInput";

const ImportStages = () => {
  return (
    <div>
      <h1 className="title">Importe de matrices</h1>
      <div>
        <FileInput
          fileText="Seleccione el archivo XSLX de su matriz"
          buttonText="Subir Matriz"
        />
      </div>
      <div className="content">
        <SimpleSelect
          title="Categoría"
          defaultOptionText="Seleccione una categoría..."
          options={[
            { value: "1", text: "4 tiempos" },
            { value: "2", text: "2 tiempos" },
            { value: "3", text: "Diesel" },
            { value: "4", text: "Todo terreno" },
            { value: "6", text: "4x4" },
            { value: "7", text: "Cuatrimoto" },
          ]}
        />
        <TextInput title="Detalles" />
      </div>
    </div>
  );
};

export default ImportStages;
