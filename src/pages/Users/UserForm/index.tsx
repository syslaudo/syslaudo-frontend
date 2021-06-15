import dateFormat from 'dateformat';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FormComponents } from '../../../components/FormComponents';
import { useUsers } from '../../../hooks/useUsers';
import { StyledUserForm } from './styles';

const {
  Button,
  ButtonGroup,
  Input,
  RadioButton,
  RadioGroup,
  Select,
} = FormComponents;

interface User {
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

interface UserFormProps {
  editingUser?: User;
  onRequestClose?: () => void;
}

export function UserForm({ editingUser, onRequestClose }: UserFormProps) {
  const { createUser, updateUser } = useUsers();
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [crm, setCrm] = useState('');
  const [type, setType] = useState('Administrador');
  const [residencyDate, setResidencyDate] = useState('');
  const [title, setTitle] = useState('Especialista');

  useEffect(() => {
    setCpf(editingUser ? editingUser.cpf : '');
    setEmail(editingUser ? editingUser.email : '');
    setName(editingUser ? editingUser.name : '');
    setType(editingUser ? editingUser.type : 'Administrador');
    setCrm(editingUser?.crm ? editingUser.crm : '');
    setResidencyDate(
      editingUser?.residencyDate
        ? dateFormat(editingUser.residencyDate, 'isoDate', true)
        : '',
    );
    setTitle(editingUser?.title ? editingUser.title : 'Especialista');
  }, [editingUser]);

  function handleReset() {
    if (editingUser) {
      setCpf(editingUser.cpf);
      setEmail(editingUser.email);
      setName(editingUser.name);
      setCrm(editingUser.crm ? editingUser.crm : '');
      setType(editingUser.type);
      setResidencyDate(
        editingUser.residencyDate
          ? dateFormat(editingUser.residencyDate, 'isoDate', true)
          : '',
      );
      setTitle(editingUser.title ? editingUser.title : 'Especialista');
    } else {
      setCpf('');
      setEmail('');
      setName('');
      setCrm('');
      setType('Administrador');
      setResidencyDate('');
      setTitle('Especialista');
    }
  }

  const user = {
    cpf: cpf.replace(/[^0-9]+/g, ''),
    email: email,
    name: name,
    type: type,
    crm: '',
    title: '',
    residencyDate: '',
  };

  if (type !== 'Administrador') {
    user.crm = crm;
  }
  if (type === 'Professor') {
    user.title = title;
  }
  if (type === 'Residente') {
    user.residencyDate = residencyDate;
  }

  async function handleCreateNewUser(event: FormEvent) {
    event.preventDefault();

    try {
      await createUser({ ...user, password: '123456' });
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

  async function handleUpdateUser(event: FormEvent) {
    event.preventDefault();

    try {
      if (!editingUser) {
        return;
      }

      await updateUser(editingUser.id, user);

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
    <StyledUserForm
      userType={type}
      onSubmit={editingUser ? handleUpdateUser : handleCreateNewUser}
    >
      {' '}
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
          id="Administrador"
          value="Administrador"
          onChange={(event) => setType(event.target.value)}
          checked={type === 'Administrador'}
        />
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
        className="inputMedico"
        id="crm"
        label="CRM"
        value={crm}
        onChange={(event) => setCrm(event.target.value)}
        required={type === 'Administrador' ? false : true}
        mask=""
      />
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
    </StyledUserForm>
  );
}
