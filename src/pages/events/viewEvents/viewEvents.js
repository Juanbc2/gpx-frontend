import React, { useCallback, useEffect } from "react";
import { getEventsApi } from "../../../services/api/events";
import { notify } from "../../../utils/toastify";
import InfoTable from "../../../components/tables/infoTable/infoTable";
import { categories } from "../../../services/data/frontInfo";

const ViewEvents = () => {
  const [events, setEvents] = React.useState([]);

  const eventColumnsNames = [
    "ID",
    "Nombre",
    "Ubicación",
    "Detalles",
    "Fecha de inicio",
    "Fecha de fin",
    "Etapas",
    "Categorías",
  ];

  const getEvents = useCallback(async () => {
    const result = await getEventsApi();
    console.log(result);
    if (result != null) {
      let events = [];
      result.map((event) => {
        return events.push({
          id: event.id,
          name: event.name,
          location: event.location,
          details: event.details,
          eventStartDate: event.eventStartDate,
          eventEndDate: event.eventEndDate,
          stagesIds: event.stagesIds.toString(),
          categoryIds: getCategoriesNames(event.categoryIds).toString(),
        });
      });
      setEvents(events);
    } else notify("warning", "Error al obtener los eventos.");
  }, []);

  const getCategoriesNames = (categoriesIds) => {
    let categoriesNames = [];
    categoriesIds.map((categoryId) => {
      let category = categories.find(
        (category) => category.value === categoryId
      );
      return category !== undefined
        ? categoriesNames.push(`(${category.text})`)
        : categoriesNames.push("(Sin categoría)");
    });
    return categoriesNames;
  };

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <div>
      <div className="content">
        <InfoTable
          title="Eventos"
          columns={[
            "id",
            "name",
            "location",
            "details",
            "eventStartDate",
            "eventEndDate",
            "stagesIds",
            "categoryIds",
          ]}
          columnsNames={eventColumnsNames}
          rows={events}
        />
      </div>
    </div>
  );
};

export default ViewEvents;
