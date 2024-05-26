import React, { useEffect, useState } from "react";
import "./editCompetitors.css";
import TextInput from "../../../components/inputs/textInput/textInput";
import MainButton from "../../../components/buttons/mainButton/mainButton";
import { useForm } from "@mantine/form";
import { notify } from "../../../utils/toastify";
import {
  createCompetitorApi,
  getCompetitorsApi,
  updateCompetitorApi,
} from "../../../services/api/competitors";
import LoadCompetitorsModal from "../../../components/modals/competitors/loadCompetitors/loadCompetitorsModal";
import SimpleSelect from "../../../components/selects/simpleSelect/simpleSelect";

const EditCompetitors = () => {
  const competitorForm = useForm({
    initialValues: {
      name: "",
      lastName: "",
      number: "",
      identification: "",
    },
  });

  const handleSubmit = async () => {
    let readyToSubmit = true;
    if (competitorForm.values.name === "") {
      notify("warning", "El nombre es requerido.");
      readyToSubmit = false;
    }
    if (competitorForm.values.lastName === "") {
      notify("warning", "Los apellidos son requeridos.");
      readyToSubmit = false;
    }
    if (competitorForm.values.number === "") {
      notify("warning", "El número de competidor es requerido.");
      readyToSubmit = false;
    }
    if (competitorForm.values.identification === "") {
      notify("warning", "La identificación es requerida.");
      readyToSubmit = false;
    }

    if (readyToSubmit) {
      let competitorData = {
        name: competitorForm.values.name,
        lastName: competitorForm.values.lastName,
        number: competitorForm.values.number,
        identification: competitorForm.values.identification,
      };
      let result = await updateCompetitorApi(
        selectedCompetitor,
        competitorData
      );
      if (result != null) {
        notify("success", "Competidor creado correctamente.");
        resetConstants();
        await getCompetitors();
      } else {
        notify("warning", "No se pudo crear el competidor.");
      }
    }
  };

  const resetConstants = () => {
    setSelectedCompetitor(null);
    competitorForm.setValues({
      name: "",
      lastName: "",
      number: "",
      identification: "",
    });
  };

  const [selectedCompetitor, setSelectedCompetitor] = useState(null);
  const [competitors, setCompetitors] = useState([]);
  const getCompetitors = async () => {
    let result = await getCompetitorsApi();
    if (result != null) {
      let competitors = result.map((competitor) => {
        return {
          value: competitor.id,
          text: `${competitor.name} ${competitor.lastName}`,
          name: competitor.name,
          lastName: competitor.lastName,
          number: competitor.number,
          identification: competitor.identification,
        };
      });
      setCompetitors(competitors);
    } else {
      notify("warning", "No se encontraron competidores.");
    }
  };

  const handleSelectCompetitor = (value) => {
    setSelectedCompetitor(value);
    let competitor = getCompetitorById(value);
    competitorForm.setValues({
      name: competitor.name,
      lastName: competitor.lastName,
      number: competitor.number,
      identification: competitor.identification,
    });
  };

  const getCompetitorById = (id) => {
    return competitors.find((competitor) => competitor.value === parseInt(id));
  };

  useEffect(() => {
    getCompetitors();
  }, []);

  return (
    <div>
      <h1 className="title">Edición de competidores</h1>
      <div className="group">
        <SimpleSelect
          title="Competidor"
          defaultOptionText="Seleccione un competidor..."
          options={competitors}
          value={selectedCompetitor}
          onChange={(e) => {
            handleSelectCompetitor(e.target.value);
          }}
        />
      </div>
      {selectedCompetitor && (
        <div>
          <div className="group">
            <div>
              <TextInput
                title="Nombre"
                placeholder="Nombre"
                onChange={(event) => {
                  competitorForm.setFieldValue("name", event.target.value);
                }}
                value={competitorForm.values.name}
              />
              <TextInput
                title="Apellidos"
                placeholder="Apellidos"
                onChange={(event) => {
                  competitorForm.setFieldValue("lastName", event.target.value);
                }}
                value={competitorForm.values.lastName}
              />
            </div>
            <div>
              <TextInput
                title="Identificación"
                placeholder="identificación"
                onChange={(event) => {
                  competitorForm.setFieldValue(
                    "identification",
                    event.target.value
                  );
                }}
                value={competitorForm.values.identification}
              />
              <TextInput
                title="Número de competidor"
                placeholder="Número de competidor"
                onChange={(event) => {
                  competitorForm.setFieldValue("number", event.target.value);
                }}
                value={competitorForm.values.number}
              />
            </div>
          </div>
          <div className="content">
            <MainButton text="Editar Competidor" onClick={handleSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCompetitors;
