import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FormComponents } from '../../../components/FormComponents';
import { useUsers } from '../../../hooks/useUsers';
import { StyledDoctorForm } from './styles';

const {
  Button,
  ButtonGroup,
  Input,
  RadioButton,
  RadioGroup,
  Select,
} = FormComponents;

interface Doctor {
  id: string;
  email_usuario: string;
  cpf: string;
  senha?: string;
  nome_do_usuario: string;
  tipo: string;
  crm?: string;
  data_residencia?: string;
  titulacao?: string;
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
  const [title, setTitle] = useState('');

  useEffect(() => {
    setCpf(editingDoctor ? editingDoctor.cpf : '');
    setEmail(editingDoctor ? editingDoctor.email_usuario : '');
    setName(editingDoctor ? editingDoctor.nome_do_usuario : '');
    setCrm(editingDoctor?.crm ? editingDoctor.crm : '');
    setType(editingDoctor ? editingDoctor.tipo : 'Médico');
    setResidencyDate(
      editingDoctor?.data_residencia
        ? String(editingDoctor.data_residencia).split('T')[0]
        : '',
    );
    setTitle(editingDoctor?.titulacao ? editingDoctor.titulacao : '');
  }, [editingDoctor]);

  function handleReset() {
    if (editingDoctor) {
      setCpf(editingDoctor.cpf);
      setEmail(editingDoctor.email_usuario);
      setName(editingDoctor.nome_do_usuario);
      setCrm(editingDoctor.crm ? editingDoctor.crm : '');
      setType(editingDoctor.tipo);
      setResidencyDate(
        editingDoctor.data_residencia
          ? String(editingDoctor.data_residencia).split('T')[0]
          : '',
      );
      setTitle(editingDoctor.titulacao ? editingDoctor.titulacao : '');
    } else {
      setCpf('');
      setEmail('');
      setName('');
      setCrm('');
      setType('Médico');
      setResidencyDate('');
      setTitle('');
    }
  }

  const doctor = {
    cpf: cpf.replace(/[^0-9]+/g, ''),
    email_usuario: email,
    nome_do_usuario: name,
    tipo: type,
    crm: '',
    titulacao: '',
    data_residencia: '',
  };

  if (type !== 'Administrador') {
    doctor.crm = crm;
  }
  if (type === 'Professor') {
    doctor.titulacao = title;
  }
  if (type === 'Residente') {
    doctor.data_residencia = residencyDate;
  }

  async function handleCreateNewDoctor(event: FormEvent) {
    event.preventDefault();

    try {
      await createDoctor({ ...doctor, senha: '123456' });
      if (onRequestClose) {
        onRequestClose();
      } else {
        handleReset();
      }
      toast.success('Cadastro realizado com sucesso!');
    } catch {
      toast.error('Erro! Cadastro não efetuado');
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
    } catch {
      toast.error('Erro! Atualização não efetuada');
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

      <RadioGroup id="tipo" label="Tipo">
        <RadioButton
          name="tipo"
          id="Médico Padrão"
          value="Médico"
          onChange={(event) => setType(event.target.value)}
          checked={type === 'Médico'}
        />
        <RadioButton
          name="tipo"
          id="Médico Residente"
          value="Residente"
          onChange={(event) => setType(event.target.value)}
          checked={type === 'Residente'}
        />
        <RadioButton
          name="tipo"
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
        id="titulacao"
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
