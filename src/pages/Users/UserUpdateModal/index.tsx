import { UserForm } from '../UserForm';
import { Modal } from '../../../components/Modal';

interface User {
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
