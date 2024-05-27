import React, { useEffect, useState } from "react";
import "./login.css";
import logoLight from "../../assets/images/logoLight.png";
import PasswordInput from "../../components/inputs/passwordInput/passwordInput";
import UsernameInput from "../../components/inputs/usernameInput/usernameInput";
import MainButton from "../../components/buttons/mainButton/mainButton";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/toastify";
import {
  isMasterUserCreatedApi,
  loginApi,
  registerApi,
} from "../../services/api/auth";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (masterUserCreated) => {
    if (username === "" || password === "") {
      notify("Por favor, llene todos los campos");
      return;
    }
    let user = {
      username: username,
      password: password,
    };
    if (masterUserCreated) {
      let result = await loginApi(user);
      if (result != null) {
        notify("success", "Inicio de sesión exitoso");
        localStorage.setItem("token", result.access_token);
        navigate("/dashboard");
      }
    } else {
      let result = await registerApi(user);
      if (result != null) {
        notify("success", "Usuario maestro creado exitosamente");
        localStorage.setItem("token", result.access_token);
        navigate("/dashboard");
      }
    }
  };

  const [masterUserCreated, setMasterUserCreated] = useState(false);
  const checkMasterUserCreated = async () => {
    let result = await isMasterUserCreatedApi();
    if (result != null) {
      setMasterUserCreated(result);
      if (!result) navigate("/");
    }
  };

  useEffect(() => {
    checkMasterUserCreated();
  }, []);

  const tokenVerified = localStorage.getItem("token");
  useEffect(() => {
    if (tokenVerified != null) {
      notify("success", "Bienvenido");
      navigate("/dashboard");
    }
  }, [tokenVerified]);

  return (
    <div>
      <div className="content">
        <div className="loginFrame">
          <img src={logoLight} alt="darien logo" className="logo" />
          <h1 className="title">Iniciar sesión</h1>
          <UsernameInput
            title="Correo"
            placeholder="Correo"
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput
            title="Contraseña"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          <MainButton
            text={masterUserCreated ? "Iniciar sesión" : "Registrar"}
            onClick={() => handleLogin(masterUserCreated)}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
