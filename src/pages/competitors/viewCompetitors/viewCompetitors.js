import React, { useCallback, useEffect } from "react";
import { getEventsApi } from "../../../services/api/events";
import { notify } from "../../../utils/toastify";
import InfoTable from "../../../components/tables/infoTable/infoTable";
import { categories } from "../../../services/data/frontInfo";
import {
  getTextFromIdsList,
  getTypeKeyByValue,
} from "../../../utils/functions";
import { getCompetitorsApi } from "../../../services/api/competitors";

const ViewCompetitors = () => {
  const [competitors, setCompetitors] = React.useState([]);

  const CompetitorColumnsNames = [
    "Nombre completo",
    "Identificación",
    "Número de competidor",
    "Marca del vehículo",
    "Modelo del vehículo",
    "Placa del vehículo",
    "Póliza de seguro",
    "Categoría",
  ];

  const getCompetitors = useCallback(async () => {
    const result = await getCompetitorsApi();
    if (result != null) {
      let events = [];
      result.map((event) => {
        return events.push({
          id: event.id,
          name: event.name + " " + event.lastName,
          number: event.number,
          identification: event.identification,
          vehicleBrand: event.vehicle.brand,
          vehicleModel: event.vehicle.model,
          vehiclePlate: event.vehicle.plate,
          insurancePolicy: event.vehicle.securePolicy,
          category: getTypeKeyByValue(
            categories,
            "text",
            event.vehicle.categoryId
          ),
        });
      });
      setCompetitors(events);
    } else notify("warning", "Error al obtener los eventos.");
  }, []);

  useEffect(() => {
    getCompetitors();
  }, [getCompetitors]);

  return (
    <div>
      <h1 className="title">Visualización de eventos</h1>
      <div className="content">
        <InfoTable
          title="Eventos"
          columns={[
            "name",
            "identification",
            "number",
            "vehicleBrand",
            "vehicleModel",
            "vehiclePlate",
            "insurancePolicy",
            "category",
          ]}
          columnsNames={CompetitorColumnsNames}
          rows={competitors}
        />
      </div>
    </div>
  );
};

export default ViewCompetitors;
