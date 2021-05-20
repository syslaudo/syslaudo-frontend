import { ExamRequestForm } from '../ExamRequestForm';
import { Modal } from '../../../../components/Modal';

interface ExamRequestModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function ExamRequestCreateModal(props: ExamRequestModalProps) {
  const { isOpen, onRequestClose } = props;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h1>Solicitação de Exame</h1>
      <ExamRequestForm onRequestClose={onRequestClose} />
    </Modal>
  );
}
