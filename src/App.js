import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";
import Stages from "./pages/stages/stages";
import NotFound from "./pages/notFound/notFound";
import Header from "./components/header/header";
import Events from "./pages/events/events";
import Login from "./pages/login/login";
import Competitors from "./pages/competitors/competitors";
import Vehicles from "./pages/vehicles/vehicles";

function App() {
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
      </Routes>
    </div>
  );
}

export default App;
