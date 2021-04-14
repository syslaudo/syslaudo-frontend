import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FormComponents } from '../../../components/FormComponents';
import { usePatients } from '../../../hooks/usePatients';

const {
  Form,
  Button,
  ButtonGroup,
  Input,
  RadioButton,
  RadioGroup,
} = FormComponents;

interface Patient {
  id: string;
  cpf: string;
  nome_paciente: string;
  sexo_paciente: string;
  cor_paciente: string;
  datanasc_paciente: Date;
}

interface PatientFormProps {
  editingPatient?: Patient;
  onRequestClose?: () => void;
}

export function PatientForm({
  editingPatient,
  onRequestClose,
}: PatientFormProps) {
  const { createPatient, updatePatient } = usePatients();
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [sex, setSex] = useState('Masculino');
  const [race, setRace] = useState('Amarelo');
  const [birth, setBirth] = useState('');

  useEffect(() => {
    setName(editingPatient ? editingPatient.nome_paciente : '');
    setCpf(editingPatient ? editingPatient.cpf : '');
    setSex(editingPatient ? editingPatient.sexo_paciente : 'Masculino');
    setRace(editingPatient ? editingPatient.cor_paciente : 'Amarelo');
    setBirth(
      editingPatient
        ? String(editingPatient.datanasc_paciente).split('T')[0]
        : '',
    );
  }, [editingPatient]);

  function handleReset() {
    if (editingPatient) {
      setName(editingPatient.nome_paciente);
      setCpf(editingPatient.cpf);
      setSex(editingPatient.sexo_paciente);
      setRace(editingPatient.cor_paciente);
      setBirth(String(editingPatient.datanasc_paciente).split('T')[0]);
    } else {
      setName('');
      setCpf('');
      setSex('Masculino');
      setRace('Amarelo');
      setBirth('');
    }
  }

  const patient = {
    cpf: cpf.replace(/[^0-9]+/g, ''),
    nome_paciente: name,
    sexo_paciente: sex,
    cor_paciente: race,
    datanasc_paciente: new Date(birth),
  };

  async function handleCreateNewPatient(event: FormEvent) {
    event.preventDefault();

    try {
      await createPatient(patient);
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

  async function handleUpdatePatient(event: FormEvent) {
    event.preventDefault();

    try {
      if (!editingPatient) {
        return;
      }

      await updatePatient(editingPatient.id, patient);

      if (onRequestClose) {
        onRequestClose();
      }
      toast.success('Cadastro atualizado com sucesso!');
    } catch {
      toast.error('Erro! Atualização não efetuada');
    }
  }

  return (
    <Form
      onSubmit={editingPatient ? handleUpdatePatient : handleCreateNewPatient}
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
        id="birth"
        label="Data de Nascimento"
        type="date"
        value={birth}
        onChange={(event) => setBirth(event.target.value)}
        required
        mask=""
      />

      <RadioGroup id="sex" label="Sexo">
        <RadioButton
          name="sex"
          id="Masculino"
          value="Masculino"
          onChange={(event) => setSex(event.target.value)}
          checked={sex === 'Masculino'}
        />
        <RadioButton
          name="sex"
          id="Feminino"
          value="Feminino"
          onChange={(event) => setSex(event.target.value)}
          checked={sex === 'Feminino'}
        />
        <RadioButton
          name="sex"
          id="Outro"
          value="Outro"
          onChange={(event) => setSex(event.target.value)}
          checked={sex === 'Outro'}
        />
        <RadioButton
          name="sex"
          id="Não informar"
          value="Não informado"
          onChange={(event) => setSex(event.target.value)}
          checked={sex === 'Não informado'}
        />
      </RadioGroup>

      <RadioGroup id="race" label="Cor">
        <RadioButton
          name="race"
          id="Amarelo"
          value="Amarelo"
          onChange={(event) => setRace(event.target.value)}
          checked={race === 'Amarelo'}
        />
        <RadioButton
          name="race"
          id="Branco"
          value="Branco"
          onChange={(event) => setRace(event.target.value)}
          checked={race === 'Branco'}
        />
        <RadioButton
          name="race"
          id="Indígena"
          value="Indígena"
          onChange={(event) => setRace(event.target.value)}
          checked={race === 'Indígena'}
        />
        <RadioButton
          name="race"
          id="Preto"
          value="Negro"
          onChange={(event) => setRace(event.target.value)}
          checked={race === 'Negro'}
        />
        <RadioButton
          name="race"
          id="Pardo"
          value="Pardo"
          onChange={(event) => setRace(event.target.value)}
          checked={race === 'Pardo'}
        />
        <RadioButton
          name="race"
          id="Não informar"
          value="Não informado"
          onChange={(event) => setRace(event.target.value)}
          checked={race === 'Não informado'}
        />
      </RadioGroup>

      <ButtonGroup>
        <Button type="submit" primary>
          Enviar
        </Button>
        <Button>Limpar</Button>
      </ButtonGroup>
    </Form>
  );
}
