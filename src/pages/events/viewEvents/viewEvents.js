import React, { useEffect } from "react";
import { getEventsApi } from "../../../services/api/events";
import { notify } from "../../../utils/toastify";
import InfoTable from "../../../components/tables/infoTable/infoTable";
import { getTextFromIdsList } from "../../../utils/functions";
import { getCategoriesApi } from "../../../services/api/categories";

const ViewEvents = () => {
  const [events, setEvents] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  const eventColumnsNames = [
    "ID",
    "Nombre",
    "Ubicación",
    "Detalles",
    "Fecha de inicio",
    "Fecha de fin",
    "Categorías",
  ];

  const getCategories = async () => {
    const result = await getCategoriesApi();
    if (result != null) {
      setCategories(result);
    } else notify("warning", "Error al obtener las categorías.");
  };

  const getEvents = async () => {
    if (categories.length === 0) {
      return;
    }
    const result = await getEventsApi();
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
          categoriesIds: getTextFromIdsList(
            event.categoriesIds,
            categories,
            "id",
            "name"
          ).join(),
        });
      });
      setEvents(events);
    } else notify("warning", "Error al obtener los eventos.");
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getEvents();
  }, [categories]);

  return (
    <div>
      <h1 className="title">Visualización de eventos</h1>
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
            "categoriesIds",
          ]}
          columnsNames={eventColumnsNames}
          rows={events}
        />
      </div>
    </div>
  );
};

export default ViewEvents;
