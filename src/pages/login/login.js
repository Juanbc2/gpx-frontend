import React, { useEffect, useState } from "react";
import "./login.css";
import logoLight from "../../assets/images/logoLight.png";
import PasswordInput from "../../components/inputs/passwordInput/passwordInput";
import UsernameInput from "../../components/inputs/usernameInput/usernameInput";
import MainButton from "../../components/buttons/mainButton/mainButton";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/toastify";
import { loginApi } from "../../services/api/auth";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (username === "" || password === "") {
      notify("Por favor, llene todos los campos");
      return;
    }
    let user = {
      username: username,
      password: password,
    };
    let result = await loginApi(user);
    if (result != null) {
      notify("success", "Inicio de sesión exitoso");
      localStorage.setItem("token", result.access_token);
      navigate("/dashboard");
    }
  };

  const tokenVerified = localStorage.getItem("token");

  useEffect(() => {
    if (tokenVerified != null) {
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
          <MainButton text="Iniciar sesión" onClick={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default Login;
