import { notify } from "../../utils/toastify";

const apiUrl = "http://localhost:8000";

export const getStagesApi = async () => {
  try {
    const response = await fetch(`${apiUrl}/stages/`);
    if (!response.ok) {
      notify("error", "Error al obtener las etapas.");
      return [];
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al obtener las etapas.");
  }
};

export const getStageByIdApi = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/stages/${id}/`);
    if (!response.ok) {
      notify("error", "Error al obtener la etapa.");
      return [];
    }
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
    if (!response.ok) {
      notify("error", "Error al crear la etapa.");
      return [];
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al crear la etapa.");
  }
};

export const deleteStageApi = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/stages/${id}/`, {
      method: "DELETE",
    });
    if (!response.ok) {
      notify("error", "Error al eliminar la etapa.");
      return [];
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al eliminar la etapa.");
  }
};
