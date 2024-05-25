import { notify } from "../../utils/toastify";

const apiUrl = "http://localhost:8000";

export const getCategoriesApi = async () => {
  try {
    const response = await fetch(`${apiUrl}/categories/`);
    if (!response.ok) {
      notify("error", "Error al obtener las categorías.");
      return [];
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al obtener las categorías.");
  }
};

export const createCategoryApi = async (categoryData) => {
  try {
    const response = await fetch(`${apiUrl}/categories/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      notify("error", "Error al crear la categoría.");
      return null;
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al crear la categoría.");
  }
};
