import { DoctorForm } from "../DoctorForm";
import { Modal } from "../../../components/Modal";

interface DoctorCreateModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function DoctorCreateModal(props: DoctorCreateModalProps) {
  const { isOpen, onRequestClose } = props;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h1>Cadastro de Médico</h1>
      <DoctorForm onRequestClose={onRequestClose} />
    </Modal>
  );
}
