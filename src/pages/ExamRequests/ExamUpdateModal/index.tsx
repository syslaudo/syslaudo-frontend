import { ExamRequestForm } from '../ExamRequestForm';
import { Modal } from '../../../components/Modal';
import { Exam } from '../../../hooks/useExams';

interface ExamUpdateModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editingExam: Exam;
}

export function ExamUpdateModal(props: ExamUpdateModalProps) {
  const { isOpen, onRequestClose, editingExam } = props;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h1>Atualizar Solicitação de Exame</h1>
      <ExamRequestForm
        editingExam={editingExam}
        onRequestClose={onRequestClose}
      />
    </Modal>
  );
}
