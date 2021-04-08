import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FormComponents } from "../../../components/FormComponents";
import { useDoctors } from "../../../hooks/useDoctors";
import { StyledDoctorForm } from "./styles";

const {
  Button,
  ButtonGroup,
  Input,
  RadioButton,
  RadioGroup,
  Select,
} = FormComponents;

interface Doctor {
  id: number;
  name: string;
  crm: string;
  type: string;
  date?: Date;
  title?: string;
}

interface DoctorFormProps {
  editingDoctor?: Doctor;
  onRequestClose?: () => void;
}

export function DoctorForm({ editingDoctor, onRequestClose }: DoctorFormProps) {
  const { createDoctor, updateDoctor } = useDoctors();
  const [name, setName] = useState("");
  const [crm, setCrm] = useState("");
  const [type, setType] = useState("Médico");
  const [residencyStartingDate, setResidencyStartingDate] = useState("");
  const [title, setTitle] = useState("");

  if (editingDoctor?.title) {
    console.log(editingDoctor?.title);
  }

  useEffect(() => {
    setName(editingDoctor ? editingDoctor.name : "");
    setCrm(editingDoctor ? editingDoctor.crm : "");
    setType(editingDoctor ? editingDoctor.type : "Médico");
    setResidencyStartingDate(
      editingDoctor?.date ? String(editingDoctor.date).split("T")[0] : ""
    );
    setTitle(editingDoctor?.title ? editingDoctor.title : "");
  }, [editingDoctor]);

  function handleReset() {
    if (editingDoctor) {
      setName(editingDoctor.name);
      setCrm(editingDoctor.crm);
      setType(editingDoctor.type);
      setResidencyStartingDate(
        editingDoctor.date ? String(editingDoctor.date).split("T")[0] : ""
      );
      setTitle(editingDoctor.title ? editingDoctor.title : "");
    } else {
      setName("");
      setCrm("");
      setType("Médico");
      setResidencyStartingDate("");
      setTitle("");
    }
  }

  async function handleCreateNewDoctor(event: FormEvent) {
    event.preventDefault();

    const doctor = {
      name,
      crm,
      type,
    };

    if (type === "Professor") {
      Object.assign(doctor, { title });
    } else {
      Object.assign(doctor, { title: null });
    }
    if (type === "Residente") {
      Object.assign(doctor, { date: new Date(residencyStartingDate) });
    } else {
      Object.assign(doctor, { date: null });
    }

    try {
      await createDoctor(doctor);
      if (onRequestClose) {
        onRequestClose();
      } else {
        handleReset();
      }
      toast.success("Cadastro realizado com sucesso!");
    } catch {
      toast.error("Erro! Cadastro não efetuado");
    }
  }

  async function handleUpdateDoctor(event: FormEvent) {
    event.preventDefault();

    const doctor = {
      name,
      crm,
      type,
    };

    if (type === "Professor") {
      Object.assign(doctor, { title });
    } else {
      Object.assign(doctor, { title: null });
    }
    if (type === "Residente") {
      Object.assign(doctor, { date: new Date(residencyStartingDate) });
    } else {
      Object.assign(doctor, { date: null });
    }

    try {
      if (!editingDoctor) {
        return;
      }

      await updateDoctor(editingDoctor.id, doctor);
      if (onRequestClose) {
        onRequestClose();
      }
      toast.success("Cadastro atualizado com sucesso!");
    } catch {
      toast.error("Erro! Atualização não efetuada");
    }
  }

  return (
    <>
      <StyledDoctorForm
        doctorType={type}
        onSubmit={editingDoctor ? handleUpdateDoctor : handleCreateNewDoctor}
      >
        <Input
          id="name"
          label="Nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <Input
          id="crm"
          label="CRM"
          value={crm}
          onChange={(event) => setCrm(event.target.value)}
          required
        />

        <RadioGroup id="tipo" label="Tipo">
          <RadioButton
            name="tipo"
            id="Médico Padrão"
            value="Médico"
            onChange={(event) => setType(event.target.value)}
            checked={type === "Médico"}
          />
          <RadioButton
            name="tipo"
            id="Médico Residente"
            value="Residente"
            onChange={(event) => setType(event.target.value)}
            checked={type === "Residente"}
          />
          <RadioButton
            name="tipo"
            id="Médico Professor"
            value="Professor"
            onChange={(event) => setType(event.target.value)}
            checked={type === "Professor"}
          />
        </RadioGroup>

        <Input
          className="inputResidente"
          label="Data de Início da Residência"
          id="data-residencia"
          type="date"
          value={residencyStartingDate}
          onChange={(event) => setResidencyStartingDate(event.target.value)}
          required={type === "Residente" ? true : false}
        />

        <Select
          className="inputProfessor"
          label="Titulação"
          id="titulacao"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required={type === "Professor" ? true : false}
        >
          <option value="Especialista">Especialista</option>
          <option value="Mestre">Mestre</option>
          <option value="Doutor">Doutor</option>
        </Select>

        <ButtonGroup>
          <Button type="submit" primary>
            Enviar
          </Button>
          <Button type="button" onClick={handleReset}>
            Descartar
          </Button>
        </ButtonGroup>
      </StyledDoctorForm>
    </>
  );
}
