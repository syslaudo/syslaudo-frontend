import { ExamFulfillForm } from '../ExamFulfillForm';
import { Modal } from '../../../components/Modal';
import { Exam } from '../../../hooks/useExams';

interface ExamFulfillModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editingExam: Exam;
}

export function ExamFulfillModal(props: ExamFulfillModalProps) {
  const { isOpen, onRequestClose, editingExam } = props;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h1>Conclusão de Exame</h1>
      <ExamFulfillForm
        editingExam={editingExam}
        onRequestClose={onRequestClose}
      />
    </Modal>
  );
}
