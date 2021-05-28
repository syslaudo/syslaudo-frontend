import { Modal } from '../../../components/Modal';
import { PatientForm } from '../PatientForm';

interface Patient {
  id: string;
  cpf: string;
  name: string;
  sex: string;
  race: string;
  birthdate: Date;
}

interface PatientUpdateModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editingPatient: Patient;
}

export function PatientUpdateModal(props: PatientUpdateModalProps) {
  const { isOpen, onRequestClose, editingPatient } = props;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h1>Atualizar Paciente</h1>
      <PatientForm
        editingPatient={editingPatient}
        onRequestClose={onRequestClose}
      />
    </Modal>
  );
}
