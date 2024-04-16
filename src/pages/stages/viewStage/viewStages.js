import React, { useEffect } from "react";
import "./viewStages.css";
import { getStagesApi } from "../../../services/api/stages";
import InfoTable from "../../../components/tables/infoTable/infoTable";
import { getEventsApi } from "../../../services/api/events";
import { categories } from "../../../services/data/frontInfo";
import { getTextFromIdsList } from "../../../utils/functions";

const ViewStages = () => {
  const [stages, setStages] = React.useState([]);

  const [events, setEvents] = React.useState([]);
  const getEvents = async () => {
    const result = await getEventsApi();
    let events = [];
    result.map((event) => {
      return events.push({
        value: event.id,
        label: event.name,
      });
    });
    setEvents(events);
  };

  const getEventName = (eventId) => {
    let event = events.find((event) => {
      return event.value === eventId;
    });
    return event ? event.label : "Evento no encontrado";
  };

  const getStages = async () => {
    const result = await getStagesApi();
    let stages = [];
    result.map((stage) => {
      return stages.push({
        id: stage.id,
        event: getEventName(stage.eventId),
        details: stage.details,
        categoriesIds: getTextFromIdsList(
          stage.categoriesIds,
          categories
        ).toString(),
        stageDate: stage.stageDate,
      });
    });
    setStages(stages);
  };

  useEffect(() => {
    getStages();
    getEvents();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <InfoTable
        title="Etapas"
        columns={["id", "event", "details", "categoriesIds", "stageDate"]}
        columnsNames={["id", "Evento", "Detalles", "Categorías", "Fecha"]}
        rows={stages}
      />
    </div>
  );
};

export default ViewStages;
