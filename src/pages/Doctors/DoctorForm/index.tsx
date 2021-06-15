import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FormComponents } from '../../../components/FormComponents';
import { useUsers } from '../../../hooks/useUsers';
import { StyledDoctorForm } from './styles';
import dateFormat from 'dateformat';

const { Button, ButtonGroup, Input, RadioButton, RadioGroup, Select } =
  FormComponents;

interface Doctor {
  id: string;
  email: string;
  cpf: string;
  password?: string;
  name: string;
  type: string;
  crm?: string;
  residencyDate?: string;
  title?: string;
}

interface DoctorFormProps {
  editingDoctor?: Doctor;
  onRequestClose?: () => void;
}

export function DoctorForm({ editingDoctor, onRequestClose }: DoctorFormProps) {
  const { createUser: createDoctor, updateUser: updateDoctor } = useUsers();
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [crm, setCrm] = useState('');
  const [type, setType] = useState('Médico');
  const [residencyDate, setResidencyDate] = useState('');
  const [title, setTitle] = useState('Especialista');

  useEffect(() => {
    setCpf(editingDoctor ? editingDoctor.cpf : '');
    setEmail(editingDoctor ? editingDoctor.email : '');
    setName(editingDoctor ? editingDoctor.name : '');
    setCrm(editingDoctor?.crm ? editingDoctor.crm : '');
    setType(editingDoctor ? editingDoctor.type : 'Médico');
    setResidencyDate(
      editingDoctor?.residencyDate
        ? dateFormat(editingDoctor.residencyDate, 'isoDate', true)
        : '',
    );
    setTitle(editingDoctor?.title ? editingDoctor.title : 'Especialista');
  }, [editingDoctor]);

  function handleReset() {
    if (editingDoctor) {
      setCpf(editingDoctor.cpf);
      setEmail(editingDoctor.email);
      setName(editingDoctor.name);
      setCrm(editingDoctor.crm ? editingDoctor.crm : '');
      setType(editingDoctor.type);
      setResidencyDate(
        editingDoctor.residencyDate
          ? dateFormat(editingDoctor.residencyDate, 'isoDate', true)
          : '',
      );
      setTitle(editingDoctor.title ? editingDoctor.title : 'Especialista');
    } else {
      setCpf('');
      setEmail('');
      setName('');
      setCrm('');
      setType('Médico');
      setResidencyDate('');
      setTitle('Especialista');
    }
  }

  const doctor = {
    cpf: cpf.replace(/[^0-9]+/g, ''),
    email: email,
    name: name,
    type: type,
    crm: '',
    title: '',
    residencyDate: '',
  };

  if (type !== 'Administrador') {
    doctor.crm = crm;
  }
  if (type === 'Professor') {
    doctor.title = title;
  }
  if (type === 'Residente') {
    doctor.residencyDate = residencyDate;
  }

  async function handleCreateNewDoctor(event: FormEvent) {
    event.preventDefault();

    try {
      await createDoctor({ ...doctor, password: '123456' });
      if (onRequestClose) {
        onRequestClose();
      } else {
        handleReset();
      }
      toast.success('Cadastro realizado com sucesso!');
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function handleUpdateDoctor(event: FormEvent) {
    event.preventDefault();

    try {
      if (!editingDoctor) {
        return;
      }

      await updateDoctor(editingDoctor.id, doctor);
      if (onRequestClose) {
        onRequestClose();
      }

      toast.success('Cadastro atualizado com sucesso!');

      setTimeout(function () {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
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

      <RadioGroup id="type" label="Tipo">
        <RadioButton
          name="type"
          id="Médico Padrão"
          value="Médico"
          onChange={(event) => setType(event.target.value)}
          checked={type === 'Médico'}
        />
        <RadioButton
          name="type"
          id="Médico Residente"
          value="Residente"
          onChange={(event) => setType(event.target.value)}
          checked={type === 'Residente'}
        />
        <RadioButton
          name="type"
          id="Médico Professor"
          value="Professor"
          onChange={(event) => setType(event.target.value)}
          checked={type === 'Professor'}
        />
      </RadioGroup>

      <Input
        className="inputResidente"
        label="Data de Início da Residência"
        id="data-residencia"
        type="date"
        value={residencyDate}
        onChange={(event) => setResidencyDate(event.target.value)}
        required={type === 'Residente' ? true : false}
        mask=""
      />

      <Select
        className="inputProfessor"
        label="Titulação"
        id="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required={type === 'Professor' ? true : false}
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
