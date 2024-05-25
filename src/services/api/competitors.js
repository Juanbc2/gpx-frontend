import { notify } from "../../utils/toastify";

const apiUrl = "http://localhost:8000";

export const getCompetitorsApi = async () => {
  try {
    const response = await fetch(`${apiUrl}/competitors/`);
    if (!response.ok) {
      notify("error", "Error al obtener los competidores.");
      return [];
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al obtener los competidores.");
  }
};

export const getCompetitorByIdApi = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/competitors/${id}/`);
    if (!response.ok) {
      notify("error", "Error al obtener el competidor.");
      return [];
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al obtener le competidor.");
  }
};

export const createCompetitorApi = async (event) => {
  try {
    const response = await fetch(`${apiUrl}/competitors/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      notify("error", "Error al crear el competidor.");
      return [];
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al crear el competidor.");
  }
};

export const bulkCreateCompetitorsApi = async (events) => {
  try {
    const response = await fetch(`${apiUrl}/competitors/bulk/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(events),
    });
    if (!response.ok) {
      notify("error", "Error al crear los competidores.");
      return [];
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al crear los competidores.");
  }
};

export const updateCompetitorApi = async (event) => {
  try {
    const response = await fetch(`${apiUrl}/competitors/${event.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      notify("error", "Error al actualizar el competidor.");
      return [];
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al actualizar el competidor.");
  }
};

export const deleteCompetitorApi = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/competitors/${id}/`, {
      method: "DELETE",
    });
    if (!response.ok) {
      notify("error", "Error al eliminar el competidor.");
      return [];
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al eliminar el competidor.");
  }
};

export const analyzeCompetitorGpxApi = async (gpxData) => {
  try {
    const response = await fetch(`${apiUrl}/competitors/gpx/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gpxData),
    });
    if (!response.ok) {
      notify("error", "Error al analizar el gpx.");
      return [];
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al analizar el gpx.");
  }
};


