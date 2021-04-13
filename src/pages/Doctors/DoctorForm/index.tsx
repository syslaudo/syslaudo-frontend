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
  email: string;
  cpf: string;
  password: string;
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
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [crm, setCrm] = useState("");
  const [type, setType] = useState("Médico");
  const [residencyStartingDate, setResidencyStartingDate] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    setCpf(editingDoctor ? editingDoctor.cpf : "");
    setEmail(editingDoctor ? editingDoctor.email : "");
    setPassword(editingDoctor ? editingDoctor.password : "");
    setPasswordCheck(editingDoctor ? editingDoctor.password : "");
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
      setCpf(editingDoctor.cpf);
      setEmail(editingDoctor.email);
      setPassword(editingDoctor.password);
      setPasswordCheck(editingDoctor.password);
      setName(editingDoctor.name);
      setCrm(editingDoctor.crm);
      setType(editingDoctor.type);
      setResidencyStartingDate(
        editingDoctor.date ? String(editingDoctor.date).split("T")[0] : ""
      );
      setTitle(editingDoctor.title ? editingDoctor.title : "");
    } else {
      setCpf("");
      setEmail("");
      setPassword("");
      setPasswordCheck("");
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
      cpf: cpf.replace(/[^0-9]+/g, ""),
      email,
      password,
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
      cpf: cpf.replace(/[^0-9]+/g, ""),
      email,
      password,
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
        mask=""
      />
      <Input
        id="cpf"
        label="CPF"
        value={cpf}
        onChange={(event) => setCpf(event.target.value)}
        required
        pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
        mask="999.999.999-99"
      />
      <Input
        id="crm"
        label="CRM"
        value={crm}
        onChange={(event) => setCrm(event.target.value)}
        required
        mask=""
      />
      <Input
        id="email"
        label="e-mail"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        required
        mask=""
      />
      <Input
        id="password"
        label="Senha"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        required
        pattern="\S{6,}"
        title="Mínimo de 6 dígitos"
        mask=""
      />
      <Input
        id="password-check"
        label="Confirme sua senha"
        value={passwordCheck}
        onChange={(event) => setPasswordCheck(event.target.value)}
        type="password"
        required
        pattern={password}
        title="Senhas não conferem"
        mask=""
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
        mask=""
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
  );
}
