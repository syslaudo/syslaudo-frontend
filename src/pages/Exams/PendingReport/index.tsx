import { useState } from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import { Table } from '../../../components/Table';
import { ActionButton } from '../../../components/Table/styles';
import { Exam, useExams } from '../../../hooks/useExams';
import { StyledContainer } from './styles';
import { ExamViewModal } from '../ExamViewModal';
import dateFormat from 'dateformat';

ReactModal.setAppElement('#root');

export function PendingReport() {
  const { exams, removeExam } = useExams();
  const [examViewModalIsOpen, setExamViewModalIsOpen] = useState(false);
  const [editingExam, setEditingExam] = useState({} as Exam);

  function handleOpenExamViewModal() {
    setExamViewModalIsOpen(true);
  }

  function handleCloseExamViewModal() {
    setExamViewModalIsOpen(false);
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
    {
      name: 'Data',
      selector: 'date',
      cell: (row: any) => dateFormat(row.date, 'dd/mm/yyyy', true),
      sortable: true,
      grow: 3,
    },
    { name: 'Status', selector: 'report_status', sortable: true, grow: 8 },
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
    // handleOpenExamUpdateModal();
  }

  function onView(e: any) {
    var id = e.target.parentNode.id;

    const exam = exams.find((exam) => String(exam.id) === String(id));

    if (!exam) {
      toast.error('Exam not in database.');
      return;
    }

    setEditingExam(exam);
    handleOpenExamViewModal();
  }

  const customActionsColumn = {
    name: 'Ações',
    cell: (row: any) => (
      <div data-tag="allowRowEvents">
        <ActionButton id={row.id} type="button" onClick={onView}>
          <i className="fas fa-search" title="Ver detalhes"></i>
        </ActionButton>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <ActionButton id={row.id} type="button" onClick={onEdit}>
          <i className="far fa-edit" title="Cadastrar laudo"></i>
        </ActionButton>
      </div>
    ),
    sortable: false,
    grow: 1,
  };

  return (
    <StyledContainer>
      <h1>Exames com Laudo Pendente</h1>
      <Table
        title="Lista de Exames"
        columns={columns}
        data={exams.filter((exam) => exam.status === 'Concluido' && exam.report_status === 'Aguardando laudo')}
        onEdit={onEdit}
        onRemove={onRemove}
        customActions={customActionsColumn}
      />
      <ExamViewModal
        isOpen={examViewModalIsOpen}
        onRequestClose={handleCloseExamViewModal}
        viewingExam={editingExam}
      />
    </StyledContainer>
  );
}
