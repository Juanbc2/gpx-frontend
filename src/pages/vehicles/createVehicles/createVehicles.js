import React, { useEffect } from "react";
import "./createVehicles.css";
import TextInput from "../../../components/inputs/textInput/textInput";
import MainButton from "../../../components/buttons/mainButton/mainButton";
import { useForm } from "@mantine/form";
import { notify } from "../../../utils/toastify";
import SimpleSelect from "../../../components/selects/simpleSelect/simpleSelect";
import { createVehicleApi } from "../../../services/api/vehicles";
import { getCompetitorsApi } from "../../../services/api/competitors";
import { getCategoriesApi } from "../../../services/api/categories";

const CreateVehicles = () => {
  const vehicleForm = useForm({
    initialValues: {
      brand: "",
      model: "",
      plate: "",
      securePolicy: "",
      competitorId: 0,
    },
  });

  const handleSubmit = async () => {
    let vehicleData = {
      brand: vehicleForm.values.brand,
      model: vehicleForm.values.model,
      plate: vehicleForm.values.plate,
      securePolicy: vehicleForm.values.securePolicy,
      competitorId: vehicleForm.values.competitorId,
    };
    let result = await createVehicleApi(vehicleData);
    if (result != null) {
      notify("success", "Vehículo creado correctamente.");
      resetConstants();
    } else {
      notify("warning", "No se pudo crear el vehículo.");
    }
  };

  const [categories, setCategories] = React.useState([]);
  const getCategories = async () => {
    let result = await getCategoriesApi();
    if (result !== null) {
      let categories = result.map((category) => {
        return {
          value: category.id,
          text: category.name,
        };
      });
      setCategories(categories);
    } else notify("warning", "No se pudieron obtener las categorías.");
  };

  const [competitors, setCompetitors] = React.useState([]);
  const getCompetitors = async () => {
    let result = await getCompetitorsApi();
    if (result !== null) {
      let competitors = result.map((competitor) => {
        return {
          value: competitor.id,
          text: `${competitor.name} ${competitor.lastName}`,
        };
      });
      setCompetitors(competitors);
    } else notify("warning", "No se pudieron obtener los competidores.");
  };

  useEffect(() => {
    getCategories();
    getCompetitors();
  }, []);

  const resetConstants = () => {
    vehicleForm.setValues({
      brand: "",
      model: "",
      plate: "",
      securePolicy: "",
      competitorId: 0,
    });
  };

  return (
    <div>
      <h1 className="title">Creación de vehículo</h1>
      <div className="group">
        <SimpleSelect
          title="Competidor"
          defaultOptionText="Seleccione un competidor..."
          options={competitors}
          value={vehicleForm.values.competitorId}
          onChange={(e) => {
            vehicleForm.setFieldValue("competitorId", e.target.value);
          }}
        />
        <TextInput
          title="Placa"
          placeholder="Placa"
          onChange={(event) => {
            vehicleForm.setFieldValue("plate", event.target.value);
          }}
          value={vehicleForm.values.plate}
        />
        <TextInput
          title="Marca"
          placeholder="Marca"
          onChange={(event) => {
            vehicleForm.setFieldValue("brand", event.target.value);
          }}
          value={vehicleForm.values.brand}
        />
      </div>
      <div className="group">
        <TextInput
          title="Modelo"
          placeholder="Modelo"
          onChange={(event) => {
            vehicleForm.setFieldValue("model", event.target.value);
          }}
          value={vehicleForm.values.model}
        />
        <TextInput
          title="Póliza de seguro"
          placeholder="Póliza de seguro"
          onChange={(event) => {
            vehicleForm.setFieldValue("securePolicy", event.target.value);
          }}
          value={vehicleForm.values.securePolicy}
        />
      </div>
      <div className="content">
        <MainButton text="Crear vehículo" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateVehicles;
