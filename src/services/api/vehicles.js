import { notify } from "../../utils/toastify";

const apiUrl = "http://localhost:8000";

export const getVehiclesApi = async () => {
  try {
    const response = await fetch(`${apiUrl}/vehicles/`);
    if (!response.ok) {
      notify("error", "Error al obtener los vehículos.");
      return [];
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al obtener los vehículos.");
  }
};

export const createVehicleApi = async (vehicleData) => {
  try {
    const response = await fetch(`${apiUrl}/vehicles/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicleData),
    });
    if (!response.ok) {
      notify("error", "Error al crear el vehículo.");
      return null;
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al crear el vehículo.");
  }
};

