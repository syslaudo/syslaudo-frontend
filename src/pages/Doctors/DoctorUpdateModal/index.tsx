import { DoctorForm } from '../DoctorForm';
import { Modal } from '../../../components/Modal';

interface Doctor {
  id: string;
  email: string;
  cpf: string;
  password?: string;
  name: string;
  type: string;
  crm?: string;
  residencyDate?: string;
  title?: string;
}

interface DoctorUpdateModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editingDoctor: Doctor;
}

export function DoctorUpdateModal(props: DoctorUpdateModalProps) {
  const { isOpen, onRequestClose, editingDoctor } = props;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h1>Atualizar Médico</h1>
      <DoctorForm
        editingDoctor={editingDoctor}
        onRequestClose={onRequestClose}
      />
    </Modal>
  );
}
