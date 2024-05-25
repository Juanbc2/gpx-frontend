import { notify } from "../../utils/toastify";

const apiUrl = "http://localhost:8000";

export const getResultsByVehicleAndStageApi = async (vehicleId, stageId) => {
  try {
    const response = await fetch(
      `${apiUrl}/competitors/results/${vehicleId}/${stageId}`
    );
    if (!response.ok) {
      notify("warning", "No se obtuvieron resultados.");
      return [];
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al obtener los resultados.");
  }
};
