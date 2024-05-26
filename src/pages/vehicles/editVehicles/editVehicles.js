import React, { useEffect } from "react";
import "./editVehicles.css";
import TextInput from "../../../components/inputs/textInput/textInput";
import MainButton from "../../../components/buttons/mainButton/mainButton";
import { useForm } from "@mantine/form";
import { notify } from "../../../utils/toastify";
import SimpleSelect from "../../../components/selects/simpleSelect/simpleSelect";
import {
  getVehiclesApi,
  updateVehicleApi,
} from "../../../services/api/vehicles";
import { getCompetitorsApi } from "../../../services/api/competitors";

const EditVehicles = () => {
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
    let result = await updateVehicleApi(selectedVehicle, vehicleData);
    if (result != null) {
      notify("success", "Vehículo creado correctamente.");
      resetConstants();
      await getVehicles();
    } else {
      notify("warning", "No se pudo crear el vehículo.");
    }
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
    getVehicles();
    getCompetitors();
  }, []);

  const resetConstants = () => {
    setSelectedVehicle(null);
    vehicleForm.setValues({
      brand: "",
      model: "",
      plate: "",
      securePolicy: "",
      competitorId: 0,
    });
  };

  const [selectedVehicle, setSelectedVehicle] = React.useState(null);
  const [vehicles, setVehicles] = React.useState([]);
  const getVehicles = async () => {
    let result = await getVehiclesApi();
    if (result !== null) {
      let vehicles = result.map((vehicle) => {
        return {
          value: vehicle.id,
          text: `${vehicle.brand} ${vehicle.model} - ${vehicle.plate}`,
          plate: vehicle.plate,
          brand: vehicle.brand,
          model: vehicle.model,
          securePolicy: vehicle.securePolicy,
          competitorId: vehicle.competitorId,
        };
      });
      setVehicles(vehicles);
    } else notify("warning", "No se pudieron obtener los vehículos.");
  };

  const handleSelectVehicle = (value) => {
    setSelectedVehicle(value);
    let vehicle = getVehicleById(value);
    vehicleForm.setValues({
      brand: vehicle.brand,
      model: vehicle.model,
      plate: vehicle.plate,
      securePolicy: vehicle.securePolicy,
      competitorId: vehicle.competitorId,
    });
  };

  const getVehicleById = (id) => {
    return vehicles.find((vehicle) => vehicle.value === parseInt(id));
  };

  return (
    <div>
      <h1 className="title">Edición de vehículo</h1>
      <div className="group">
        <SimpleSelect
          title="Vehículo"
          defaultOptionText="Seleccione un vehículo..."
          options={vehicles}
          value={selectedVehicle}
          onChange={(e) => handleSelectVehicle(e.target.value)}
        />
      </div>
      {selectedVehicle && (
        <div>
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
            <MainButton text="Editar vehículo" onClick={handleSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditVehicles;
