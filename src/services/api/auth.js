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

export const isMasterUserCreatedApi = async () => {
  try {
    const response = await fetch(`${apiUrl}/users/masterCreated/`);
    if (!response.ok) {
      notify("info", "Ocurrió algo en la autenticación.");
      return null;
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al verificar si el usuario maestro fue creado.");
  }
};

export const verifyTokenApi = async (token) => {
  try {
    const response = await fetch(`${apiUrl}/users/verifyToken/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    });
    if (!response.ok) {
      notify("info", "Token inválido.");
      return null;
    }
    return response.json();
  } catch (error) {
    notify("error", "Error al verificar el token.");
  }
};
