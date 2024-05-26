import React, { useEffect } from "react";
import CardButton from "../../components/buttons/cardButton/cardButton";
import MainButton from "../../components/buttons/mainButton/mainButton";
import { useNavigate, useLocation } from "react-router-dom";
import EditVehicles from "./editVehicles/editVehicles";
import CreateVehicles from "./createVehicles/createVehicles";
import ViewVehicles from "./viewVehicles/viewVehicles";
import "./vehicles.css";
import { notify } from "../../utils/toastify";
import CreateCategories from "./createCategories/createCategories";

const Vehicles = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSubPage, setSelectedSubPage] = React.useState("");

  useEffect(() => {
    location.state != null &&
      location.state.subPage != null &&
      setSelectedSubPage(location.state.subPage);
  }, [location]);

  const tokenVerified = localStorage.getItem("token");
  useEffect(() => {
    if (tokenVerified == null) {
      notify("error", "No tiene permisos para acceder a esta página");
      navigate("/");
    }
  }, [tokenVerified]);

  return (
    <div>
      {selectedSubPage === "" && (
        <div>
          <div className="title">
            <h1>Gestión de vehículos</h1>
          </div>
          <div className="options">
            <CardButton
              title="Crear vehículos"
              description="Crea un vehículo nuevo, al cual se le debe asignar un competidor"
              onClick={() => setSelectedSubPage("create")}
            />
            <CardButton
              title="Editar vehículos"
              description="Edición de vehículos creados anteriormente"
              onClick={() => setSelectedSubPage("edit")}
            />
            <CardButton
              title="Visualización de vehículos"
              description="Visualización de vehículos creados anteriormente"
              onClick={() => setSelectedSubPage("view")}
            />
            <CardButton
              title="Categorías de vehículos"
              description="Gestión de categorías de vehículos, creación y visualización de las mismas"
              onClick={() => setSelectedSubPage("categories")}
            />
          </div>
          <div className="content">
            <MainButton text="Atrás" onClick={() => navigate("/dashboard")} />
          </div>
        </div>
      )}

      <div className="content">
        {selectedSubPage === "create" && <CreateVehicles />}
        {selectedSubPage === "edit" && <EditVehicles />}
        {selectedSubPage === "view" && <ViewVehicles />}
        {selectedSubPage === "categories" && <CreateCategories />}
      </div>
    </div>
  );
};

export default Vehicles;
