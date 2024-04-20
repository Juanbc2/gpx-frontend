import { notify } from "../../utils/toastify";

const apiUrl = "http://localhost:8000";

export const loginApi = async (user) => {
  try {
    const response = await fetch(`${apiUrl}/users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log();
    if (!response.ok) {
      notify("info", "Usuario o contraseña incorrectos.");
      return null;
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al iniciar sesión.");
  }
};

export const registerApi = async (user) => {
  try {
    const response = await fetch(`${apiUrl}/users/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      notify("info", "No se pudo registrar el usuario.");
      return null;
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al registrar el usuario.");
  }
};
