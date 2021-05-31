import dateFormat from 'dateformat';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FormComponents } from '../../../../components/FormComponents';
import { MultilineInput } from '../../../../components/FormComponents/MultilineInput';
import { useExams, Exam } from '../../../../hooks/useExams';
import { usePatients } from '../../../../hooks/usePatients';

const { Form, Button, ButtonGroup, Input, RadioButton, RadioGroup } =
  FormComponents;

interface ExamRequestFormProps {
  editingExam?: Exam;
  onRequestClose?: () => void;
}

export function ExamRequestForm({
  editingExam,
  onRequestClose,
}: ExamRequestFormProps) {
  const { createExam, updateExam, getRecommendationByExamType } = useExams();
  const { getPatientByCpf } = usePatients();
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [hypotesis, setHypotesis] = useState('');
  const [recommendations, setRecommendations] = useState('');

  useEffect(() => {
    if (editingExam) {
      const editingExamPatient = getPatientByCpf(editingExam.cpf);
      setName(
        editingExamPatient
          ? editingExamPatient.name
          : 'Patient not in database',
      );
      setCpf(editingExam.cpf);
      setType(editingExam.type);
      setHypotesis(editingExam.hypotesis);
      setRecommendations(getRecommendationByExamType(editingExam.type));
      setDate(dateFormat(editingExam.date, 'dd/mm/yyyy', true));
    } else {
      setName('');
      setCpf('');
      setType('Ecocardiograma');
      setHypotesis('');
      setRecommendations('');
      setDate('');
    }
  }, [editingExam, getPatientByCpf, getRecommendationByExamType]);

  function handleReset() {
    if (editingExam) {
      const editingExamPatient = getPatientByCpf(editingExam.cpf);
      setName(
        editingExamPatient
          ? editingExamPatient.name
          : 'Patient not in database',
      );
      setCpf(editingExam.cpf);
      setType(editingExam.type);
      setHypotesis(editingExam.hypotesis);
      setRecommendations(getRecommendationByExamType(editingExam.type));
      setDate(dateFormat(editingExam.date, 'dd/mm/yyyy', true));
    } else {
      setCpf('');
      setType('Ecocardiograma');
      setHypotesis('');
      setRecommendations('');
      setDate('');
    }
  }

  async function handleCreateNewExamRequest(event: FormEvent) {
    event.preventDefault();

    const exam = {
      cpf: cpf.replace(/[^0-9]+/g, ''),
      type,
      date: new Date(date),
      status: 'Agendado',
      hypotesis,
      image: '',
      report: '',
      report_status: 'Aguardando laudo',
    };

    try {
      await createExam(exam);
      if (onRequestClose) {
        onRequestClose();
      } else {
        handleReset();
      }
      toast.success('Cadastro realizado com sucesso!');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function handleUpdateExamRequest(event: FormEvent) {
    event.preventDefault();

    if (!editingExam) {
      return;
    }

    const exam = {
      cpf: cpf.replace(/[^0-9]+/g, ''),
      type,
      date: new Date(date),
      status: editingExam.status,
      hypotesis,
      image: editingExam.image,
      report: editingExam.report,
      report_status: editingExam.report_status,
    };

    try {
      await updateExam(editingExam.id, exam);
      if (onRequestClose) {
        onRequestClose();
      }

      toast.success('Atualizado com sucesso!');

      setTimeout(function () {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <Form
      onSubmit={
        editingExam ? handleUpdateExamRequest : handleCreateNewExamRequest
      }
    >
      <Input
        id="cpf"
        label="CPF do Paciente"
        value={cpf}
        pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
        mask="999.999.999-99"
        onChange={(event) => setCpf(event.target.value)}
        onBlur={(event) => {
          const patient = getPatientByCpf(event.target.value.replace(/[^0-9]+/g, ''));

          if (patient) {
            setName(patient.name);
          } else {
            setName('');
          }
        }}
      />
      <Input id="name" label="Nome do Paciente" value={name} mask="" disabled />

      <RadioGroup id="type" label="Exame">
        <RadioButton
          name="type"
          id="Ecocardiograma"
          value="Ecocardiograma"
          onChange={(event) => {
            setType(event.target.value);
            setRecommendations(getRecommendationByExamType(event.target.value));
          }}
          checked={type === 'Ecocardiograma'}
        />
        <RadioButton
          name="type"
          id="Eletrocardiograma"
          value="Eletrocardiograma"
          onChange={(event) => {
            setType(event.target.value);
            setRecommendations(getRecommendationByExamType(event.target.value));
          }}
          checked={type === 'Eletrocardiograma'}
        />
        <RadioButton
          name="type"
          id="Mapa"
          value="Mapa"
          onChange={(event) => {
            setType(event.target.value);
            setRecommendations(getRecommendationByExamType(event.target.value));
          }}
          checked={type === 'Mapa'}
        />
        <RadioButton
          name="type"
          id="Router"
          value="Router"
          onChange={(event) => {
            setType(event.target.value);
            setRecommendations(getRecommendationByExamType(event.target.value));
          }}
          checked={type === 'Router'}
        />
      </RadioGroup>

      <Input
        id="data"
        label="Data Prevista"
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        mask=""
      />
      <MultilineInput
        id="hypotesis"
        label="Hipótese Diagnosticada - CID"
        value={hypotesis}
        onChange={(event) => setHypotesis(event.target.value)}
      />

      <MultilineInput
        id="recomendações"
        label="Recomendações"
        value={recommendations}
        disabled
      />

      <ButtonGroup>
        <Button type="submit" primary>
          Enviar
        </Button>
        <Button type="button" onClick={handleReset}>
          Limpar
        </Button>
      </ButtonGroup>
    </Form>
  );
}
