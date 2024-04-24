import React, { useEffect } from "react";
import "./viewStages.css";
import { getStagesApi } from "../../../services/api/stages";
import InfoTable from "../../../components/tables/infoTable/infoTable";
import { getEventsApi } from "../../../services/api/events";
import { categories } from "../../../services/data/frontInfo";
import { getTextFromIdsList } from "../../../utils/functions";
import MainButton from "../../../components/buttons/mainButton/mainButton";
import ViewWaypoint from "../viewWaypoint/viewWaypoint";

const ViewStages = () => {
  const [stages, setStages] = React.useState([]);

  const [events, setEvents] = React.useState([]);
  const getEvents = async () => {
    const result = await getEventsApi();
    if (result != null) {
      let events = [];
      result.map((event) => {
        return events.push({
          value: event.id,
          label: event.name,
        });
      });
      setEvents(events);
    }
  };

  const getEventName = (eventId) => {
    let event = events.find((event) => {
      return event.value === eventId;
    });
    return event ? event.label : "Evento no encontrado";
  };

  const getStages = async () => {
    const result = await getStagesApi();
    if (result != null) {
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
          waypoints: (
            <MainButton
              text={"Ver Waypoints"}
              onClick={() => {
                handleSelectedStage(stage);
                // navigate("/viewWaypoint", {
                //   state: { stage: stage },
                // });
              }}
            >
              Ver waypoints
            </MainButton>
          ),
        });
      });
      setStages(stages);
    }
  };

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getStages();
    // eslint-disable-next-line
  }, [events]);

  const [viewWaypointShow, setViewWaypointShow] = React.useState(false);
  const [selectedStage, setSelectedStage] = React.useState(null);

  const handleSelectedStage = (stage) => {
    setSelectedStage(stage);
    setViewWaypointShow(true);
  };

  const handleOnCloseViewWaypoint = () => {
    setViewWaypointShow(false);
  };

  return (
    <div>
      {viewWaypointShow ? (
        <ViewWaypoint
          stage={selectedStage}
          onClose={handleOnCloseViewWaypoint}
        />
      ) : (
        <div>
          <h1 className="title">Visualización de etapas</h1>
          <div className="content">
            <InfoTable
              title="Etapas"
              columns={[
                "id",
                "event",
                "stageDate",
                "details",
                "categoriesIds",
                "waypoints",
              ]}
              columnsNames={[
                "id",
                "Evento",
                "Fecha",
                "Detalles",
                "Categorías",
                "Waypoints",
              ]}
              rows={stages}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStages;
