import dateFormat from 'dateformat';
import { Modal } from '../../../components/Modal';
import { Exam, useExams } from '../../../hooks/useExams';
import { usePatients } from '../../../hooks/usePatients';
import { StyledContainer } from './styles';
import { FormComponents } from '../../../components/FormComponents';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { loggedUser } from "../../../services/auth";

const { Form, Button, ButtonGroup, MultilineInput } = FormComponents;

interface ExamViewModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editingExam: Exam;
}

export function ReportModal(props: ExamViewModalProps) {
  const { isOpen, onRequestClose, editingExam } = props;
  const { updateExam } = useExams();
  const { patients } = usePatients();
  const [report, setReport] = useState('');

  const patient = patients.find((patient) => patient.cpf === editingExam.cpf);

  useEffect(() => {
    setReport(editingExam.report);
  }, [editingExam]);

  function handleReset() {
    setReport(editingExam.report);
  }

  async function handleAddReport(event: FormEvent) {
    event.preventDefault();

    const exam = {
      cpf: editingExam.cpf,
      type: editingExam.type,
      date: editingExam.date,
      status: editingExam.status,
      hypotesis: editingExam.hypotesis,
      image: editingExam.image,
      report: report,
      report_status: '',
    };

    if (loggedUser.type === 'Residente') {
      exam.report_status = 'Provisório'
    }
    if (loggedUser.type === 'Professor') {
      exam.report_status = 'Concluído'
    }

    try {
      await updateExam(editingExam.id, exam);
      
      toast.success('Atualizado com sucesso!');
      
      setTimeout(function () {
        if (onRequestClose) {
          onRequestClose();
        }
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <StyledContainer>
        <h1>Exame - Cadastro de Laudo</h1>

        <p>
          <strong>Paciente: </strong> {patient?.name}
        </p>
        <p>
          <strong>CPF: </strong>{' '}
          {editingExam.cpf?.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            '$1.$2.$3-$4',
          )}
        </p>
        <p>
          <strong>Tipo do Exame: </strong> {editingExam.type}
        </p>
        <p>
          <strong>Data: </strong>{' '}
          {dateFormat(editingExam.date, 'dd/mm/yyyy', true)}
        </p>
        <br />

        <Form onSubmit={handleAddReport}>
          <MultilineInput
            id="laudo"
            label="Laudo"
            value={report}
            onChange={(event) => setReport(event.target.value)}
            required
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

        <a href={editingExam.image} target="_blank">
          <p>Abrir em nova aba</p>
        </a>
        <iframe
          src={editingExam.image}
          title="Imagem do exame"
          width="100%"
          height="800px"
        />
      </StyledContainer>
    </Modal>
  );
}
