import { DoctorForm } from '../DoctorForm';
import { Modal } from '../../../components/Modal';

interface Doctor {
  id: string;
  cpf: string;
  email_usuario: string;
  senha?: string;
  nome_do_usuario: string;
  tipo: string;
  crm?: string;
  data_residencia?: string;
  titulacao?: string;
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
