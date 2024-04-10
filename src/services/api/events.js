const apiUrl = "http://localhost:8000";

export const getEventsApi = async () => {
  const response = await fetch(`${apiUrl}/events/`);
  return response.json();
};

export const getEventByIdApi = async (id) => {
  const response = await fetch(`${apiUrl}/events/${id}/`);
  return response.json();
};

export const createEventApi = async (event) => {
  const response = await fetch(`${apiUrl}/events/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  return response.json();
};
