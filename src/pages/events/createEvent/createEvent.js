import React from "react";
import "./createEvent.css";
import TextInput from "../../../components/inputs/textInput/textInput";
import DateInput from "../../../components/inputs/dateInput/dateInput";
import CheckboxSelect from "../../../components/selects/checkboxSelect/checkboxSelect";
import { categories } from "../../../services/data/frontInfo";
import MainButton from "../../../components/buttons/mainButton/mainButton";
import { useForm } from "@mantine/form";
import { notify } from "../../../utils/toastify";
import { createEventApi } from "../../../services/api/events";

const CreateEvent = () => {
  const handleSelectedCategories = (values) => {
    eventForm.setFieldValue(
      "categories",
      values.map((value) => {
        return value.value;
      })
    );
  };

  const eventForm = useForm({
    initialValues: {
      name: "",
      location: "",
      startDate: "2024-01-01",
      endDate: "2024-12-30",
      details: "",
      categories: [],
    },
  });

  const handleSubmit = async () => {
    if (!eventForm.values.name) {
      notify("warning", "Ingrese un nombre.");
      return;
    }
    if (!eventForm.values.location) {
      notify("warning", "Ingrese una localización.");
      return;
    }
    if (!eventForm.values.startDate) {
      notify("warning", "Ingrese una fecha de inicio.");
      return;
    }
    if (!eventForm.values.endDate) {
      notify("warning", "Ingrese una fecha de fin.");
      return;
    }
    if (eventForm.values.categories.length === 0) {
      notify("warning", "Seleccione al menos una categoría.");
      return;
    }
    let eventData = {
      name: eventForm.values.name,
      details: eventForm.values.details,
      location: eventForm.values.location,
      eventStartDate: eventForm.values.startDate,
      eventEndDate: eventForm.values.endDate,
      categoryIds: eventForm.values.categories,
    };

    let result = await createEventApi(eventData);
    if (result != null) {
      notify("success", "Evento creado correctamente.");
      resetConstants();
    } else {
      notify("warning", "No se pudo crear el evento.");
    }
  };

  const resetConstants = () => {
    eventForm.setValues({
      name: "",
      location: "",
      startDate: "2024-01-01",
      endDate: "2024-12-30",
      details: "",
      categories: [],
    });
  };

  return (
    <div>
      <h1 className="title">Creación de evento</h1>
      <div className="group">
        <div>
          <TextInput
            title="Nombre"
            placeholder="Nombre"
            onChange={(event) => {
              eventForm.setFieldValue("name", event.target.value);
            }}
            value={eventForm.values.name}
          />
          <TextInput
            title="Localización"
            placeholder="Localización"
            onChange={(event) => {
              eventForm.setFieldValue("location", event.target.value);
            }}
            value={eventForm.values.location}
          />
        </div>
        <div>
          <DateInput
            title="Fecha Inicial"
            onChange={(event) => {
              eventForm.setFieldValue("startDate", event.target.value);
            }}
            value={eventForm.values.startDate}
          />
          <DateInput
            title="Fecha Final"
            onChange={(event) => {
              eventForm.setFieldValue("endDate", event.target.value);
            }}
            value={eventForm.values.endDate}
          />
        </div>
        <div>
          <TextInput
            title="Detalles"
            placeholder="Detalles del evento"
            onChange={(event) =>
              eventForm.setFieldValue("details", event.target.value)
            }
            value={eventForm.values.details}
          />
          <CheckboxSelect
            title="Categoría"
            defaultOptionText="Seleccione una(s) categoría(s)..."
            options={categories}
            onChange={handleSelectedCategories}
          />
        </div>
      </div>
      <div className="content">
        <MainButton text="Crear Evento" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateEvent;
