import { Modal } from '../../../components/Modal';
import { PatientForm } from '../PatientForm';

interface PatientCreateModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function PatientCreateModal(props: PatientCreateModalProps) {
  const { isOpen, onRequestClose } = props;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h1>Cadastro de Paciente</h1>
      <PatientForm onRequestClose={onRequestClose} />
    </Modal>
  );
}
