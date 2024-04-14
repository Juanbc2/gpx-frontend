import { notify } from "../../utils/toastify";

const apiUrl = "http://localhost:8000";

export const getEventsApi = async () => {
  try {
    const response = await fetch(`${apiUrl}/events/`);
    return response.json();
  } catch (error) {
    notify("error", "Error al obtener los eventos.");
  }
};

export const getEventByIdApi = async (id) => {
  const response = await fetch(`${apiUrl}/events/${id}/`);
  return response.json();
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
    return response.json();
  } catch (error) {
    notify("error", "Error al crear el evento.");
  }
};
