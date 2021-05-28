import { useState } from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import { Button } from '../../components/FormComponents/Button';
import { Table } from '../../components/Table';
import { useUsers } from '../../hooks/useUsers';
import { StyledContainer } from './styles';
import { UserCreateModal } from './UserCreateModal';
import { UserUpdateModal } from './UserUpdateModal';

ReactModal.setAppElement('#root');

interface User {
  id: string;
  cpf: string;
  email: string;
  password?: string;
  name: string;
  type: string;
  crm?: string;
  residencyDate?: string;
  title?: string;
}

export function Users() {
  const { users, removeUser } = useUsers();
  const [userCreateModalIsOpen, setUserCreateModalIsOpen] = useState(false);
  const [userUpdateModalIsOpen, setUserUpdateModalIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState({} as User);

  function handleOpenUserCreateModal() {
    setUserCreateModalIsOpen(true);
  }

  function handleCloseUserCreateModal() {
    setUserCreateModalIsOpen(false);
  }

  function handleOpenUserUpdateModal() {
    setUserUpdateModalIsOpen(true);
  }

  function handleCloseUserUpdateModal() {
    setUserUpdateModalIsOpen(false);
  }

  const columns = [
    { name: 'Id', selector: 'id', sortable: true, omit: true },
    {
      name: 'CPF',
      selector: 'cpf',
      cell: (row: any) =>
        row.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
      sortable: true,
      grow: 4,
    },
    { name: 'Nome', selector: 'name', sortable: true, grow: 7 },
    { name: 'E-mail', selector: 'email', sortable: true, grow: 5 },
    { name: 'Tipo', selector: 'type', sortable: true, grow: 4 },
  ];

  function onRemove(e: any) {
    var id = e.target.parentNode.id;
    if (
      window.confirm(
        'Tem certeza que deseja remover esse item? Esta ação é irreversível!',
      )
    ) {
      removeUser(id);
      toast.success('Removido com sucesso!');
    }
  }

  function onEdit(e: any) {
    var id = e.target.parentNode.id;
    const user = users.find((user) => user.id === id);

    if (!user) {
      toast.error('Doctor not in database.');
      return;
    }

    setEditingUser(user);
    handleOpenUserUpdateModal();
  }

  return (
    <StyledContainer>
      <h1>Usuários</h1>
      <Button primary onClick={handleOpenUserCreateModal}>
        Cadastrar Novo
      </Button>
      <Table
        title="Lista de Usuários"
        columns={columns}
        data={users}
        onEdit={onEdit}
        onRemove={onRemove}
      />
      <UserCreateModal
        isOpen={userCreateModalIsOpen}
        onRequestClose={handleCloseUserCreateModal}
      />
      <UserUpdateModal
        isOpen={userUpdateModalIsOpen}
        onRequestClose={handleCloseUserUpdateModal}
        editingUser={editingUser}
      />
    </StyledContainer>
  );
}
