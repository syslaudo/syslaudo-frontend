import { useState } from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import { Button } from '../../components/FormComponents/Button';
import { Table } from '../../components/Table';
import { useUsers } from '../../hooks/useUsers';
import { DoctorCreateModal } from './DoctorCreateModal';
import { DoctorUpdateModal } from './DoctorUpdateModal';
import { StyledContainer } from './styles';

ReactModal.setAppElement('#root');

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

export function Doctors() {
  const { users: doctors, removeUser: removeDoctor } = useUsers();
  const [doctorCreateModalIsOpen, setDoctorCreateModalIsOpen] = useState(false);
  const [doctorUpdateModalIsOpen, setDoctorUpdateModalIsOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState({} as Doctor);

  function handleOpenDoctorCreateModal() {
    setDoctorCreateModalIsOpen(true);
  }

  function handleCloseDoctorCreateModal() {
    setDoctorCreateModalIsOpen(false);
  }

  function handleOpenDoctorUpdateModal() {
    setDoctorUpdateModalIsOpen(true);
  }

  function handleCloseDoctorUpdateModal() {
    setDoctorUpdateModalIsOpen(false);
  }

  const columns = [
    { name: 'Id', selector: 'id', sortable: true, omit: true },
    {
      name: 'CPF',
      selector: 'cpf',
      cell: (row: any) =>
        row.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
      sortable: true,
      grow: 3,
    },
    { name: 'Nome', selector: 'nome_do_usuario', sortable: true, grow: 6 },
    { name: 'CRM', selector: 'crm', sortable: true, grow: 1 },
    { name: 'Tipo', selector: 'tipo', sortable: true, grow: 2 },
    {
      name: 'Início da Residência',
      selector: 'data_residencia',
      sortable: true,
      grow: 2,
    },
    { name: 'Titulação', selector: 'titulacao', sortable: true, grow: 2 },
  ];

  function onRemove(e: any) {
    var id = e.target.parentNode.id;
    if (
      window.confirm(
        'Tem certeza que deseja remover esse item? Esta ação é irreversível!',
      )
    ) {
      removeDoctor(id);
      toast.success('Removido com sucesso!');
    }
  }

  function onEdit(e: any) {
    var id = e.target.parentNode.id;
    const doctor = doctors.find((doctor) => doctor.id === id);

    if (!doctor) {
      toast.error('Doctor not in database.');
      return;
    }

    setEditingDoctor(doctor);
    handleOpenDoctorUpdateModal();
  }

  return (
    <StyledContainer>
      <h1>Médicos</h1>
      <Button primary onClick={handleOpenDoctorCreateModal}>
        Cadastrar Novo
      </Button>
      <Table
        title="Lista de Médicos"
        columns={columns}
        data={doctors.filter((doctor) => doctor.tipo !== 'Administrador')}
        onEdit={onEdit}
        onRemove={onRemove}
      />
      <DoctorCreateModal
        isOpen={doctorCreateModalIsOpen}
        onRequestClose={handleCloseDoctorCreateModal}
      />
      <DoctorUpdateModal
        isOpen={doctorUpdateModalIsOpen}
        onRequestClose={handleCloseDoctorUpdateModal}
        editingDoctor={editingDoctor}
      />
    </StyledContainer>
  );
}
