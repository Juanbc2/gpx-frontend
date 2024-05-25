import React, { useCallback, useEffect } from "react";
import { notify } from "../../../utils/toastify";
import InfoTable from "../../../components/tables/infoTable/infoTable";

import { getCompetitorsApi } from "../../../services/api/competitors";

const ViewCompetitors = () => {
  const [competitors, setCompetitors] = React.useState([]);

  const CompetitorColumnsNames = [
    "No. competidor",
    "Nombre",
    "Apellidos",
    "Identificación",
  ];

  const getCompetitors = useCallback(async () => {
    const result = await getCompetitorsApi();
    if (result != null) {
      let competitors = [];
      result.map((competitor) => {
        return competitors.push({
          id: competitor.id,
          name: competitor.name,
          lastName: competitor.lastName,
          number: competitor.number,
          identification: competitor.identification,
        });
      });
      setCompetitors(competitors);
    } else notify("warning", "Error al obtener los eventos.");
  }, []);

  useEffect(() => {
    getCompetitors();
  }, [getCompetitors]);

  return (
    <div>
      <h1 className="title">Visualización de competidores</h1>
      <div className="content">
        <InfoTable
          title="Eventos"
          columns={["number", "name", "lastName", "identification"]}
          columnsNames={CompetitorColumnsNames}
          rows={competitors}
        />
      </div>
    </div>
  );
};

export default ViewCompetitors;
