import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";
import Stages from "./pages/stages/stages";
import NotFound from "./pages/notFound/notFound";
import Header from "./components/header/header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="stages" element={<Stages />} />
      </Routes>
    </div>
  );
}

export default App;
