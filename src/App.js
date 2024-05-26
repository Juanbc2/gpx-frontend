import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";
import Stages from "./pages/stages/stages";
import NotFound from "./pages/notFound/notFound";
import Header from "./components/header/header";
import Events from "./pages/events/events";
import Login from "./pages/login/login";
import Competitors from "./pages/competitors/competitors";
import Vehicles from "./pages/vehicles/vehicles";
import Results from "./pages/results/results";
import { verifyTokenApi } from "./services/api/auth";

function App() {
  const navigate = useNavigate();

  const checkTokenExpired = async () => {
    const token = localStorage.getItem("token");
    if (token == null) {
      navigate("/");
    } else {
      try {
        const response = await verifyTokenApi({ token: token });
        if (response) {
          localStorage.removeItem("token");
          navigate("/");
        }
      } catch (error) {
        console.error("Hubo un error al verificar el token:", error);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    checkTokenExpired();
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/stages" element={<Stages />} />
        <Route path="/events" element={<Events />} />
        <Route path="/drivers" element={<Competitors />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
