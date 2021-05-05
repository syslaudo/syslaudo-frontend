import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FormComponents } from '../../../components/FormComponents';
import { MultilineInput } from '../../../components/FormComponents/MultilineInput';
import { useExams, Exam } from '../../../hooks/useExams';
import { usePatients } from '../../../hooks/usePatients';
import dateFormat from 'dateformat';

const {
  Form,
  Button,
  ButtonGroup,
  Input,
  RadioButton,
  RadioGroup,
} = FormComponents;

interface ExamFulfillFormProps {
  editingExam: Exam;
  onRequestClose?: () => void;
}

export function ExamFulfillForm({
  editingExam,
  onRequestClose,
}: ExamFulfillFormProps) {
  const { updateExam, getRecommendationByExamType } = useExams();
  const { getPatientByCpf } = usePatients();
  const [image, setImage] = useState('');
  const cpf = editingExam.cpf;
  const name = getPatientByCpf(editingExam.cpf)?.name;
  const type = editingExam.type;
  const hypotesis = editingExam.hypotesis;
  const recommendations = getRecommendationByExamType(editingExam.type);
  const date = new Date();

  useEffect(() => {
    setImage(editingExam.image);
  }, [editingExam]);

  function handleReset() {
    setImage(editingExam.image);
  }

  async function handleFulfillExam(event: FormEvent) {
    event.preventDefault();

    const exam = {
      cpf: cpf.replace(/[^0-9]+/g, ''),
      type,
      date,
      status: 'Concluido',
      hypotesis,
      image,
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
    } catch {
      toast.error('Erro! Atualização não efetuada');
    }
  }

  return (
    <Form onSubmit={handleFulfillExam}>
      <Input id="cpf" label="CPF do Paciente" mask="" value={cpf} disabled />
      <Input id="name" label="Nome do Paciente" value={name} mask="" disabled />

      <RadioGroup id="type" label="Exame">
        <RadioButton
          name="type"
          id="Ecocardiograma"
          value="Ecocardiograma"
          checked={type === 'Ecocardiograma'}
          disabled
        />
        <RadioButton
          name="type"
          id="Eletrocardiograma"
          value="Eletrocardiograma"
          checked={type === 'Eletrocardiograma'}
          disabled
        />
        <RadioButton
          name="type"
          id="Mapa"
          value="Mapa"
          checked={type === 'Mapa'}
          disabled
        />
        <RadioButton
          name="type"
          id="Router"
          value="Router"
          checked={type === 'Router'}
          disabled
        />
      </RadioGroup>

      <Input
        id="data"
        label="Data"
        type="date"
        value={dateFormat(date, 'isoDate')}
        mask=""
        disabled
      />
      <MultilineInput
        id="hypotesis"
        label="Hipótese Diagnosticada - CID"
        value={hypotesis}
        disabled
      />

      <MultilineInput
        id="recomendações"
        label="Recomendações"
        value={recommendations}
        disabled
      />

      <Input
        id="image"
        label="Imagem"
        type="file"
        value={image}
        onChange={(event) => setImage(event.target.value)}
        mask=""
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
