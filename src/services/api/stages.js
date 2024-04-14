import { notify } from "../../utils/toastify";

const apiUrl = "http://localhost:8000";

export const getStagesApi = async () => {
  try {
    const response = await fetch(`${apiUrl}/stages/`);
    return response.json();
  } catch (error) {
    notify("error", "Error al obtener las etapas.");
  }
};

export const getStageByIdApi = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/stages/${id}/`);
    return response.json();
  } catch (error) {
    notify("error", "Error al obtener la etapa.");
  }
};

export const createStageApi = async (stage) => {
  try {
    const response = await fetch(`${apiUrl}/stages/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stage),
    });
    return response.json();
  } catch (error) {
    notify("error", "Error al crear la etapa.");
  }
};
