import React from "react";
import "./createCompetitors.css";
import TextInput from "../../../components/inputs/textInput/textInput";
import { categories } from "../../../services/data/frontInfo";
import MainButton from "../../../components/buttons/mainButton/mainButton";
import { useForm } from "@mantine/form";
import { notify } from "../../../utils/toastify";
import SimpleSelect from "../../../components/selects/simpleSelect/simpleSelect";
import { createCompetitorApi } from "../../../services/api/competitors";

const CreateCompetitors = () => {
  const competitorForm = useForm({
    initialValues: {
      name: "",
      lastName: "",
      number: "",
      identification: "",
      vehicle: {
        brand: "",
        model: "",
        categoryId: 0,
        plate: "",
        securePolicy: "",
      },
      currentStagesIds: [],
    },
  });

  const handleSubmit = async () => {
    let readyToSubmit = true;
    if (competitorForm.values.name === "") {
      notify("warning", "El nombre es requerido.");
      readyToSubmit = false;
    }
    if (competitorForm.values.lastName === "") {
      notify("warning", "Los apellidos son requeridos.");
      readyToSubmit = false;
    }
    if (competitorForm.values.number === "") {
      notify("warning", "El número de competidor es requerido.");
      readyToSubmit = false;
    }
    if (competitorForm.values.identification === "") {
      notify("warning", "La identificación es requerida.");
      readyToSubmit = false;
    }

    if (competitorForm.values.vehicle.categoryId === 0) {
      notify("warning", "La categoría es requerida.");
      readyToSubmit = false;
    }
    if (readyToSubmit) {
      let competitorData = {
        name: competitorForm.values.name,
        lastName: competitorForm.values.lastName,
        number: competitorForm.values.number,
        identification: competitorForm.values.identification,
        vehicle: competitorForm.values.vehicle,
        currentStagesIds: [],
      };
      let result = await createCompetitorApi(competitorData);
      if (result != null) {
        notify("success", "Competidor creado correctamente.");
        resetConstants();
      } else {
        notify("warning", "No se pudo crear el competidor.");
      }
    }
  };

  const resetConstants = () => {
    competitorForm.setValues({
      name: "",
      lastName: "",
      number: "",
      identification: "",
      vehicle: {
        brand: "",
        model: "",
        categoryId: 0,
        plate: "",
        securePolicy: "",
      },
      currentStagesIds: [],
    });
  };

  return (
    <div>
      <h1 className="title">Creación de competidores</h1>
      <div className="group">
        <div>
          <TextInput
            title="Nombre"
            placeholder="Nombre"
            onChange={(event) => {
              competitorForm.setFieldValue("name", event.target.value);
            }}
            value={competitorForm.values.name}
          />
          <TextInput
            title="Apellidos"
            placeholder="Apellidos"
            onChange={(event) => {
              competitorForm.setFieldValue("lastName", event.target.value);
            }}
            value={competitorForm.values.lastName}
          />
        </div>
        <div>
          <TextInput
            title="Identificación"
            placeholder="identificación"
            onChange={(event) => {
              competitorForm.setFieldValue(
                "identification",
                event.target.value
              );
            }}
            value={competitorForm.values.identification}
          />
          <TextInput
            title="Número de competidor"
            placeholder="Número de competidor"
            onChange={(event) => {
              competitorForm.setFieldValue("number", event.target.value);
            }}
            value={competitorForm.values.number}
          />
        </div>
        <div className="subgroup">
          <h2>Vehículo</h2>
          <TextInput
            title="Placa"
            placeholder="Placa"
            onChange={(event) => {
              competitorForm.setFieldValue("vehicle.plate", event.target.value);
            }}
            value={competitorForm.values.vehicle.plate}
          />
          <TextInput
            title="Marca"
            placeholder="Marca"
            onChange={(event) => {
              competitorForm.setFieldValue("vehicle.brand", event.target.value);
            }}
            value={competitorForm.values.vehicle.brand}
          />
          <TextInput
            title="Modelo"
            placeholder="Modelo"
            onChange={(event) => {
              competitorForm.setFieldValue("vehicle.model", event.target.value);
            }}
            value={competitorForm.values.vehicle.model}
          />
          <SimpleSelect
            title="Categoría"
            defaultOptionText="Seleccione una(s) categoría(s)..."
            options={categories}
            value={competitorForm.values.vehicle.categoryId}
            onChange={(e) => {
              competitorForm.setFieldValue(
                "vehicle.categoryId",
                e.target.value
              );
            }}
          />
          <TextInput
            title="Póliza de seguro"
            placeholder="Póliza de seguro"
            onChange={(event) => {
              competitorForm.setFieldValue(
                "vehicle.securePolicy",
                event.target.value
              );
            }}
            value={competitorForm.values.vehicle.securePolicy}
          />
        </div>
      </div>
      <div className="content">
        <MainButton text="Crear Competidor" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateCompetitors;
