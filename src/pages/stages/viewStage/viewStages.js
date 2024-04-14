import React, { useEffect } from "react";
import "./viewStages.css";
import { getStagesApi } from "../../../services/api/stages";
import InfoTable from "../../../components/tables/infoTable/infoTable";

const ViewStages = () => {
  const [stages, setStages] = React.useState([]);

  const getStages = async () => {
    const result = await getStagesApi();
    let stages = [];
    result.map((stage) => {
      return stages.push({
        eventId: stage.eventId,
        details: stage.details,
        categoriesIds: stage.categoriesIds.toString(),
        stageDate: stage.stageDate,
      });
    });
    setStages(stages);
  };

  useEffect(() => {
    getStages();
  }, []);

  return (
    <div>
      <InfoTable
        title="Etapas"
        columns={["eventId", "details", "categoriesIds", "stageDate"]}
        columnsNames={["ID", "Detalles", "Categorías", "Fecha"]}
        rows={stages}
      />
    </div>
  );
};

export default ViewStages;
