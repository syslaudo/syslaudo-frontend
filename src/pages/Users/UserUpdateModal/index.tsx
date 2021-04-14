import { UserForm } from "../UserForm";
import { Modal } from "../../../components/Modal";

interface User {
  id: number;
  cpf: string;
  email: string;
  password: string;
  name: string;
  type: string;
  crm?: string;
  date?: Date;
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
      <h1>Atualizar Médico</h1>
      <UserForm editingUser={editingUser} onRequestClose={onRequestClose} />
    </Modal>
  );
}
