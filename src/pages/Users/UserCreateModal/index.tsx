import { UserForm } from '../UserForm';
import { Modal } from '../../../components/Modal';

interface UserCreateModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function UserCreateModal(props: UserCreateModalProps) {
  const { isOpen, onRequestClose } = props;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h1>Cadastro de Usuário</h1>
      <UserForm onRequestClose={onRequestClose} />
    </Modal>
  );
}
