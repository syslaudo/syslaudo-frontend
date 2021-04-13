import { useState } from "react";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import { Button } from "../../components/FormComponents/Button";
import { Table } from "../../components/Table";
import { useUsers } from "../../hooks/useUsers";
import { DoctorCreateModal } from "./DoctorCreateModal";
import { DoctorUpdateModal } from "./DoctorUpdateModal";
import { StyledContainer } from "./styles";

ReactModal.setAppElement("#root");

interface Doctor {
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
    { name: "Id", selector: "id", sortable: true, omit: true },
    { name: "Nome", selector: "name", sortable: true, grow: 8 },
    {
      name: "CPF",
      selector: "cpf",
      cell: (row: any) =>
        row.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
      sortable: true,
      grow: 4,
    },
    { name: "E-mail", selector: "email", sortable: true, grow: 7 },
    { name: "Tipo", selector: "type", sortable: true, grow: 1 },
    { name: "CRM", selector: "crm", sortable: true, grow: 1 },
  ];

  function onRemove(e: any) {
    var id = e.target.parentNode.id;
    if (
      window.confirm(
        "Tem certeza que deseja remover esse item? Esta ação é irreversível!"
      )
    ) {
      removeDoctor(id);
      toast.success("Removido com sucesso!");
    }
  }

  function onEdit(e: any) {
    var id = e.target.parentNode.id;
    const doctor = doctors.find((doctor) => doctor.id === Number(id));

    if (!doctor) {
      toast.error("Doctor not in database.");
      return;
    }

    setEditingDoctor(doctor);
    handleOpenDoctorUpdateModal();
  }

  // Expandable rows content
  const ExpandableComponent = ({ data }: any) => {
    if (data.type === "Residente") {
      return (
        <p>
          <strong>Início da Residência:</strong>{" "}
          {String(data.date).split("T")[0]}
        </p>
      );
    } else if (data.type === "Professor") {
      return (
        <p>
          <strong>Titulação:</strong> {data.title}
        </p>
      );
    } else {
      return null;
    }
  };

  return (
    <StyledContainer>
      <h1>Médicos</h1>
      <Button primary onClick={handleOpenDoctorCreateModal}>
        Cadastrar Novo
      </Button>
      <Table
        title="Lista de Médicos"
        columns={columns}
        data={doctors.filter((doctor) => doctor.type !== "Administrador")}
        onEdit={onEdit}
        onRemove={onRemove}
        expandableRows
        expandOnRowClicked
        expandableRowsComponent={<ExpandableComponent />}
        expandableRowDisabled={(row) => row.type === "Médico"}
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
