import React, { useEffect } from "react";
import "./createCategories.css";
import TextInput from "../../../components/inputs/textInput/textInput";
import MainButton from "../../../components/buttons/mainButton/mainButton";
import { useForm } from "@mantine/form";
import { notify } from "../../../utils/toastify";
import SimpleSelect from "../../../components/selects/simpleSelect/simpleSelect";
import { createCategoryApi } from "../../../services/api/categories";
import { getCategoriesApi } from "../../../services/api/categories";
import InfoTable from "../../../components/tables/infoTable/infoTable";

const CreateCategories = () => {
  const categoryForm = useForm({
    initialValues: {
      name: "",
      description: "",
    },
  });

  const handleSubmit = async () => {
    let categoryData = {
      name: categoryForm.values.name,
      description: categoryForm.values.description,
    };
    let result = await createCategoryApi(categoryData);
    if (result != null) {
      notify("success", "Categoría creada correctamente.");
      getCategories();
      resetConstants();
    } else {
      notify("warning", "No se pudo crear la categoría.");
    }
  };

  const [categories, setCategories] = React.useState([]);
  const getCategories = async () => {
    let result = await getCategoriesApi();
    if (result !== null) {
      setCategories(result);
    } else notify("warning", "No se pudieron obtener las categorías.");
  };

  useEffect(() => {
    getCategories();
  }, []);

  const resetConstants = () => {
    categoryForm.setValues({
      name: "",
      description: "",
    });
  };

  return (
    <div>
      <h1 className="title">Gestión de categorías</h1>
      <div
        style={{
          display: "flex",
        }}
      >
        <div className="subgroup">
          <span className="subgroup_title">Crear categoría</span>
          <TextInput
            title="Nombre"
            placeholder="Nombre de la categoría"
            onChange={(event) => {
              categoryForm.setFieldValue("name", event.target.value);
            }}
            value={categoryForm.values.name}
          />
          <TextInput
            title="Descripción"
            placeholder="Descripción de la categoría"
            onChange={(event) => {
              categoryForm.setFieldValue("description", event.target.value);
            }}
            value={categoryForm.values.description}
          />
          <div className="content">
            <MainButton text="Crear categoría" onClick={handleSubmit} />
          </div>
        </div>
        <div className="content">
          <InfoTable
            columns={["id", "name", "description"]}
            columnsNames={["ID", "Nombre", "Descripción"]}
            rows={categories}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCategories;
