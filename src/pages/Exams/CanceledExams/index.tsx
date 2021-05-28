import { useState } from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import { Table } from '../../../components/Table';
import { Exam, useExams } from '../../../hooks/useExams';
import { ExamRequestUpdateModal } from "../ScheduledExams/ExamRequestUpdateModal";
import { StyledContainer } from './styles';

ReactModal.setAppElement('#root');

export function CanceledExams() {
  const { exams, removeExam } = useExams();
  const [examUpdateModalIsOpen, setExamUpdateModalIsOpen] = useState(false);
  const [editingExam, setEditingExam] = useState({} as Exam);

  function handleOpenExamUpdateModal() {
    setExamUpdateModalIsOpen(true);
  }

  function handleCloseExamUpdateModal() {
    setExamUpdateModalIsOpen(false);
  }

  const columns = [
    { name: 'Id', selector: 'id', sortable: true, omit: true },
    {
      name: 'CPF do Paciente',
      selector: 'cpf',
      cell: (row: any) =>
        row.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
      sortable: true,
      grow: 3,
    },
    { name: 'Tipo', selector: 'type', sortable: true, grow: 4 },
    { name: 'Status', selector: 'status', sortable: true, grow: 3 },
    {
      name: 'Data',
      selector: 'date',
      cell: (row: any) => String(row.date).split('T')[0],
      sortable: true,
      grow: 5,
    },
  ];

  function onRemove(e: any) {
    var id = e.target.parentNode.id;
    if (
      window.confirm(
        'Tem certeza que deseja remover esse item? Esta ação é irreversível!',
      )
    ) {
      removeExam(id);
      toast.success('Removido com sucesso!');

      setTimeout(function () {
        window.location.reload();
      }, 2000);
    }
  }

  function onEdit(e: any) {
    var id = e.target.parentNode.id;

    const exam = exams.find((exam) => String(exam.id) === String(id));

    if (!exam) {
      toast.error('Exam not in database.');
      return;
    }

    setEditingExam(exam);
    handleOpenExamUpdateModal();
  }

  return (
    <StyledContainer>
      <h1>Exames Cancelados</h1>
      <Table
        title="Lista de Exames"
        columns={columns}
        data={exams.filter((exam) => exam.status === 'Cancelado')}
        onEdit={onEdit}
        onRemove={onRemove}
      />
      <ExamRequestUpdateModal
        isOpen={examUpdateModalIsOpen}
        onRequestClose={handleCloseExamUpdateModal}
        editingExam={editingExam}
      />
    </StyledContainer>
  );
}
