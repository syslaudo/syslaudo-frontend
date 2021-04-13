import { useState } from "react";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import { Button } from "../../components/FormComponents/Button";
import { Table } from "../../components/Table";
import { usePatients } from "../../hooks/usePatients";
import { PatientCreateModal } from "./PatientCreateModal";
import { PatientUpdateModal } from "./PatientUpdateModal";
import { StyledContainer } from "./styles";

ReactModal.setAppElement("#root");

interface Patient {
  id: number;
  cpf: string;
  name: string;
  sex: string;
  race: string;
  birth: Date;
}

export function Patients() {
  const { patients, removePatient } = usePatients();
  const [patientCreateModalIsOpen, setPatientCreateModalIsOpen] = useState(
    false
  );
  const [patientUpdateModalIsOpen, setPatientUpdateModalIsOpen] = useState(
    false
  );
  const [editingPatient, setEditingPatient] = useState({} as Patient);

  function handleOpenPatientCreateModal() {
    setPatientCreateModalIsOpen(true);
  }

  function handleClosePatientCreateModal() {
    setPatientCreateModalIsOpen(false);
  }

  function handleOpenPatientUpdateModal() {
    setPatientUpdateModalIsOpen(true);
  }

  function handleClosePatientUpdateModal() {
    setPatientUpdateModalIsOpen(false);
  }

  const columns = [
    { name: "Id", selector: "id", sortable: true, omit: true },
    { name: "Nome", selector: "name", sortable: true, grow: 6 },
    {
      name: "CPF",
      selector: "cpf",
      cell: (row: any) =>
        row.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
      sortable: true,
      grow: 4,
    },
    { name: "Sexo", selector: "sex", sortable: true, grow: 3 },
    { name: "Cor", selector: "race", sortable: true, grow: 3 },
    {
      name: "Data de Nascimento",
      selector: "birth",
      cell: (row: any) => String(row.birth).split("T")[0],
      sortable: true,
      grow: 3,
    },
  ];

  function onRemove(e: any) {
    var id = e.target.parentNode.id;
    if (
      window.confirm(
        "Tem certeza que deseja remover esse item? Esta ação é irreversível!"
      )
    ) {
      removePatient(id);
      toast.success("Removido com sucesso!");
    }
  }

  function onEdit(e: any) {
    var id = e.target.parentNode.id;
    const patient = patients.find((patient) => patient.id === Number(id));

    if (!patient) {
      toast.error("Patient not in database.");
      return;
    }

    setEditingPatient(patient);
    handleOpenPatientUpdateModal();
  }

  return (
    <StyledContainer>
      <h1>Pacientes</h1>
      <Button primary onClick={handleOpenPatientCreateModal}>
        Cadastrar Novo
      </Button>
      <Table
        title="Lista de Médicos"
        columns={columns}
        data={patients}
        onEdit={onEdit}
        onRemove={onRemove}
      />
      <PatientCreateModal
        isOpen={patientCreateModalIsOpen}
        onRequestClose={handleClosePatientCreateModal}
      />
      <PatientUpdateModal
        isOpen={patientUpdateModalIsOpen}
        onRequestClose={handleClosePatientUpdateModal}
        editingPatient={editingPatient}
      />
    </StyledContainer>
  );
}
