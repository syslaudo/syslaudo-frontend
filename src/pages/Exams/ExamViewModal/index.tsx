import { Modal } from '../../../components/Modal';
import { Exam } from '../../../hooks/useExams';
import { usePatients } from '../../../hooks/usePatients';
import { StyledContainer } from './styles';

interface ExamViewModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  viewingExam: Exam;
}

export function ExamViewModal(props: ExamViewModalProps) {
  const { isOpen, onRequestClose, viewingExam } = props;
  const { patients } = usePatients();

  const patient = patients.find((patient) => patient.cpf === viewingExam.cpf);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <StyledContainer>
        <h1>Exame - {viewingExam.type}</h1>

        <p>
          <strong>Paciente: </strong> {patient?.name}
        </p>
        <p>
          <strong>CPF: </strong> {viewingExam.cpf}
        </p>
        <p>
          <strong>Tipo do Exame: </strong> {viewingExam.type}
        </p>
        <p>
          <strong>Data: </strong> {viewingExam.date}
        </p>
        <br />

        <iframe
          src={viewingExam.image}
          title="Imagem do exame"
          width="100%"
          height="800px"
        />
        <a href={viewingExam.image} target="_blank">
          <p>Abrir em nova aba</p>
        </a>
      </StyledContainer>
    </Modal>
  );
}