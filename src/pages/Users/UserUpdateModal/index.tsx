import { UserForm } from '../UserForm';
import { Modal } from '../../../components/Modal';

interface User {
  id: string;
  email_usuario: string;
  cpf: string;
  senha?: string;
  nome_do_usuario: string;
  tipo: string;
  crm?: string;
  data_residencia?: string;
  titulacao?: string;
}

interface UserUpdateModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editingUser: User;
}

export function UserUpdateModal(props: UserUpdateModalProps) {
  const { isOpen, onRequestClose, editingUser } = props;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h1>Atualizar Usuário</h1>
      <UserForm editingUser={editingUser} onRequestClose={onRequestClose} />
    </Modal>
  );
}
