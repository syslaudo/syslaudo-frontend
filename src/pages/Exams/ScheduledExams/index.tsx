import dateFormat from 'dateformat';
import { useState } from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import { Button } from '../../../components/FormComponents/Button';
import { Table } from '../../../components/Table';
import { ActionButton } from '../../../components/Table/styles';
import { Exam, useExams } from '../../../hooks/useExams';
import { ExamFulfillModal } from './ExamFulfillModal';
import { ExamRequestCreateModal } from './ExamRequestCreateModal';
import { ExamRequestUpdateModal } from './ExamRequestUpdateModal';
import { StyledContainer } from './styles';

ReactModal.setAppElement('#root');

export function ScheduledExams() {
  const { exams, removeExam } = useExams();
  const [examRequestModalIsOpen, setExamRequestModalIsOpen] = useState(false);
  const [examUpdateModalIsOpen, setExamUpdateModalIsOpen] = useState(false);
  const [examFulfillModalIsOpen, setExamFulfillModalIsOpen] = useState(false);
  const [editingExam, setEditingExam] = useState({} as Exam);

  function handleOpenExamRequestModal() {
    setExamRequestModalIsOpen(true);
  }

  function handleCloseExamRequestModal() {
    setExamRequestModalIsOpen(false);
  }

  function handleOpenExamUpdateModal() {
    setExamUpdateModalIsOpen(true);
  }

  function handleCloseExamUpdateModal() {
    setExamUpdateModalIsOpen(false);
  }

  function handleOpenExamFulfillModal() {
    setExamFulfillModalIsOpen(true);
  }

  function handleCloseExamFulfillModal() {
    setExamFulfillModalIsOpen(false);
  }

  const columns = [
    { name: 'Id', selector: 'id', sortable: true, omit: true },
    {
      name: 'CPF do Paciente',
      selector: 'cpf',
      cell: (row: any) =>
        row.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
      sortable: true,
      grow: 4,
    },
    { name: 'Tipo', selector: 'type', sortable: true, grow: 4 },
    { name: 'Status', selector: 'status', sortable: true, grow: 3 },
    {
      name: 'Data',
      selector: 'date',
      cell: (row: any) => dateFormat(row.date, 'dd/mm/yyyy', true),
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

  function onFulfill(e: any) {
    var id = e.target.parentNode.id;

    const exam = exams.find((exam) => String(exam.id) === String(id));

    if (!exam) {
      toast.error('Exam not in database.');
      return;
    }

    setEditingExam(exam);
    handleOpenExamFulfillModal();
  }

  const customActionsColumn = {
    name: 'Ações',
    cell: (row: any) => (
      <div data-tag="allowRowEvents">
        <ActionButton id={row.id} type="button" onClick={onEdit}>
          <i className="far fa-edit" title="Editar"></i>
        </ActionButton>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <ActionButton id={row.id} type="button" onClick={onRemove}>
          <i className="fas fa-trash-alt" title="Remover"></i>
        </ActionButton>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <ActionButton id={row.id} type="button" onClick={onEdit}>
          <i className="fas fa-print" title="Imprimir detalhes"></i>
        </ActionButton>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <ActionButton id={row.id} type="button" onClick={onFulfill}>
          <i className="fas fa-check-square" title="Concluir"></i>
        </ActionButton>
      </div>
    ),
    sortable: false,
    grow: 4,
  };

  return (
    <StyledContainer>
      <h1>Exames Agendados</h1>
      <Button primary onClick={handleOpenExamRequestModal}>
        Agendar novo
      </Button>
      <Table
        title="Lista de Exames"
        columns={columns}
        data={exams.filter((exam) => exam.status === 'Agendado')}
        onEdit={onEdit}
        onRemove={onRemove}
        customActions={customActionsColumn}
      />
      <ExamRequestCreateModal
        isOpen={examRequestModalIsOpen}
        onRequestClose={handleCloseExamRequestModal}
      />
      <ExamRequestUpdateModal
        isOpen={examUpdateModalIsOpen}
        onRequestClose={handleCloseExamUpdateModal}
        editingExam={editingExam}
      />
      <ExamFulfillModal
        isOpen={examFulfillModalIsOpen}
        onRequestClose={handleCloseExamFulfillModal}
        editingExam={editingExam}
      />
    </StyledContainer>
  );
}
