import { notify } from "../../utils/toastify";

const apiUrl = "http://localhost:8000";

export const getEventsApi = async () => {
  try {
    const response = await fetch(`${apiUrl}/events/`);
    if (!response.ok) {
      notify("error", "Error al obtener los eventos.");
      return [];
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al obtener los eventos.");
  }
};

export const getEventByIdApi = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/events/${id}/`);
    if (!response.ok) {
      notify("error", "Error al obtener el evento.");
      return [];
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al obtener le evento.");
  }
};

export const getEventsWithStagesApi = async () => {
  try {
    const response = await fetch(`${apiUrl}/events/stages/`);
    if (!response.ok) {
      notify("error", "Error al obtener las etapas.");
      return [];
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al obtener las etapas.");
  }
};

export const createEventApi = async (event) => {
  try {
    const response = await fetch(`${apiUrl}/events/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      notify("error", "Error al crear el evento.");
      return [];
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al crear el evento.");
  }
};

export const updateEventApi = async (eventId, event) => {
  try {
    const response = await fetch(`${apiUrl}/events/${eventId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      notify("error", "Error al actualizar el evento.");
      return [];
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al actualizar el evento.");
  }
};
