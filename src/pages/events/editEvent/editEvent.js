import React, { useEffect, useState } from "react";
import "./editEvent.css";
import TextInput from "../../../components/inputs/textInput/textInput";
import DateInput from "../../../components/inputs/dateInput/dateInput";
import CheckboxSelect from "../../../components/selects/checkboxSelect/checkboxSelect";
import MainButton from "../../../components/buttons/mainButton/mainButton";
import { useForm } from "@mantine/form";
import { notify } from "../../../utils/toastify";
import {
  createEventApi,
  getEventsApi,
  updateEventApi,
} from "../../../services/api/events";
import { dateToInputDate } from "../../../utils/functions";
import { getCategoriesApi } from "../../../services/api/categories";
import SimpleSelect from "../../../components/selects/simpleSelect/simpleSelect";

const EditEvent = () => {
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
      startDate: dateToInputDate(new Date()),
      endDate: dateToInputDate(new Date()),
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
      categoriesIds: eventForm.values.categories,
    };

    let result = await updateEventApi(selectedEvent, eventData);
    if (result != null) {
      notify("success", "Evento creado correctamente.");
      resetConstants();
    } else {
      notify("warning", "No se pudo crear el evento.");
    }
  };

  const [selectedEvent, setSelectedEvent] = useState(0);
  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    const result = await getEventsApi();
    if (result != null) {
      let events = result.map((event) => {
        return {
          value: event.id,
          text: event.name,
          details: event.details,
          location: event.location,
          eventStartDate: event.eventStartDate,
          eventEndDate: event.eventEndDate,
          categoriesIds: event.categoriesIds,
          name: event.name,
        };
      });
      setEvents(events);
    }
  };

  const handleSelectEvent = (value) => {
    setSelectedEvent(value);
    let event = getEventById(value);
    eventForm.setValues({
      name: event.name,
      location: event.location,
      startDate: event.eventStartDate,
      endDate: event.eventEndDate,
      details: event.details,
      categories: event.categoriesIds,
    });
    checkCategories(event.categoriesIds);
  };

  const checkCategories = (categoriesIds) => {
    let newCategories = [...categories];
    newCategories.forEach((category) => {
      if (categoriesIds.includes(category.value)) {
        category.checked = true;
      }
    });
    setCurrentCategories(newCategories);
  };

  const getEventById = (id) => {
    return events.find((event) => event.value == id);
  };

  const [currentCategories, setCurrentCategories] = useState([]);
  const [categories, setCategories] = React.useState([]);
  const getCategories = async () => {
    const result = await getCategoriesApi();
    if (result != null) {
      let categories = result.map((category) => {
        return {
          value: category.id,
          text: category.name,
          checked: false,
        };
      });
      setCategories(categories);
    } else notify("warning", "Error al obtener las categorías.");
  };

  useEffect(() => {
    getEvents();
    getCategories();
  }, []);

  const resetConstants = () => {
    setSelectedEvent(0);
    eventForm.setValues({
      name: "",
      location: "",
      startDate: "",
      endDate: "",
      details: "",
      categories: [],
    });
  };

  return (
    <div>
      <h1 className="title">Edición de evento</h1>
      <div className="content">
        <SimpleSelect
          title="Evento"
          defaultOptionText="Seleccione un evento..."
          options={events}
          value={selectedEvent}
          onChange={(e) => {
            handleSelectEvent(e.target.value);
          }}
        />
      </div>
      {selectedEvent != 0 && (
        <div>
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
                  console.log(event.target.value);
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
                options={currentCategories}
                onChange={handleSelectedCategories}
              />
            </div>
          </div>
          <div className="content">
            <MainButton text="Editar Evento" onClick={handleSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditEvent;
