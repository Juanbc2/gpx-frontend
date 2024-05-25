import React, { useCallback, useEffect } from "react";
import { notify } from "../../../utils/toastify";
import InfoTable from "../../../components/tables/infoTable/infoTable";
import { getVehiclesApi } from "../../../services/api/vehicles";

const ViewVehicles = () => {
  const [vehicles, setVehicles] = React.useState([]);

  const VehicleColumnsNames = [
    "Competidor",
    "Marca",
    "Modelo",
    "Placa",
    "Poliza de seguro",
  ];

  const getVehicles = useCallback(async () => {
    const result = await getVehiclesApi();
    if (result != null) {
      let vehicles = [];
      result.map((vehicle) => {
        return vehicles.push({
          id: vehicle.id,
          competitor:
            vehicle.competitor.name + " " + vehicle.competitor.lastName,
          vehicleBrand: vehicle.brand,
          vehicleModel: vehicle.model,
          vehiclePlate: vehicle.plate,
          insurancePolicy: vehicle.securePolicy,
        });
      });
      setVehicles(vehicles);
    } else notify("warning", "Error al obtener los vehicleos.");
  }, []);

  useEffect(() => {
    getVehicles();
  }, [getVehicles]);

  return (
    <div>
      <h1 className="title">Visualización de vehículos</h1>
      <div className="content">
        <InfoTable
          title="Eventos"
          columns={[
            "competitor",
            "vehicleBrand",
            "vehicleModel",
            "vehiclePlate",
            "insurancePolicy",
          ]}
          columnsNames={VehicleColumnsNames}
          rows={vehicles}
        />
      </div>
    </div>
  );
};

export default ViewVehicles;
