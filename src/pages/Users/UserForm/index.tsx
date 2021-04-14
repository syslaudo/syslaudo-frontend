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
  email_usuario: string;
  cpf: string;
  senha: string;
  nome_do_usuario: string;
  tipo: string;
  crm?: string;
  data_residencia?: string;
  titulacao?: string;
}

interface UserFormProps {
  editingUser?: User;
  onRequestClose?: () => void;
}

export function UserForm({ editingUser, onRequestClose }: UserFormProps) {
  const { createUser, updateUser } = useUsers();
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [crm, setCrm] = useState('');
  const [type, setType] = useState('Administrador');
  const [residencyDate, setResidencyDate] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    setCpf(editingUser ? editingUser.cpf : '');
    setEmail(editingUser ? editingUser.email_usuario : '');
    setPassword('');
    setPasswordCheck('');
    setName(editingUser ? editingUser.nome_do_usuario : '');
    setType(editingUser ? editingUser.tipo : 'Administrador');
    setCrm(editingUser?.crm ? editingUser.crm : '');
    setResidencyDate(
      editingUser?.data_residencia
        ? String(editingUser.data_residencia).split('T')[0]
        : '',
    );
    setTitle(editingUser?.titulacao ? editingUser.titulacao : '');
  }, [editingUser]);

  function handleReset() {
    if (editingUser) {
      setCpf(editingUser.cpf);
      setEmail(editingUser.email_usuario);
      setPassword('');
      setPasswordCheck('');
      setName(editingUser.nome_do_usuario);
      setCrm(editingUser.crm ? editingUser.crm : '');
      setType(editingUser.tipo);
      setResidencyDate(
        editingUser.data_residencia
          ? String(editingUser.data_residencia).split('T')[0]
          : '',
      );
      setTitle(editingUser.titulacao ? editingUser.titulacao : '');
    } else {
      setCpf('');
      setEmail('');
      setPassword('');
      setPasswordCheck('');
      setName('');
      setCrm('');
      setType('Administrador');
      setResidencyDate('');
      setTitle('');
    }
  }

  const user = {
    cpf: cpf.replace(/[^0-9]+/g, ''),
    email_usuario: email,
    senha: password,
    nome_do_usuario: name,
    tipo: type,
    crm: '',
    titulacao: '',
    data_residencia: '',
  };

  if (type !== 'Administrador') {
    user.crm = crm;
  }
  if (type === 'Professor') {
    user.titulacao = title;
  }
  if (type === 'Residente') {
    user.data_residencia = residencyDate;
  }

  async function handleCreateNewUser(event: FormEvent) {
    event.preventDefault();

    try {
      await createUser(user);
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
    } catch {
      toast.error('Erro! Atualização não efetuada');
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
        label="Confirme a senha"
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
          id="Administrador"
          value="Administrador"
          onChange={(event) => setType(event.target.value)}
          checked={type === 'Administrador'}
        />
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
    </StyledUserForm>
  );
}
