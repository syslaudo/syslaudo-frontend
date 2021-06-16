import dateFormat from 'dateformat';
import { useExams } from '../../../hooks/useExams';
import { usePatients } from '../../../hooks/usePatients';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { StyledContainer } from './styles';


export function InfoPrint1(props: any) {
  const { patients } = usePatients();
  const { exams, getRecommendationByExamType } = useExams();

  const search = props.location.search;    
  const id = new URLSearchParams(search).get("id");

  const viewingExam = exams.find((exam) => String(exam.id) === id);

  const recommendation = getRecommendationByExamType(viewingExam?.type ? viewingExam.type : '')

  const patient = patients.find((patient) => patient.cpf === viewingExam?.cpf);

  return (
      <StyledContainer>
        <div className="logo">
          <Logo className="svg" />
        </div>

        <div>
          <h1>Agendamento - {viewingExam?.type}</h1>
        </div>

        <p>
          <strong>Paciente: </strong> {patient?.name}
        </p>
        <p>
          <strong>CPF: </strong>{' '}
          {viewingExam?.cpf?.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            '$1.$2.$3-$4',
          )}
        </p>
        <p>
          <strong>Tipo do Exame: </strong> {viewingExam?.type}
        </p>
        <p>
          <strong>Data: </strong>{' '}
          {dateFormat(viewingExam?.date, 'dd/mm/yyyy', true)}
        </p>
        <p>
          <strong>Tipo do Exame: </strong> {viewingExam?.type}
        </p>
        <p>
          <strong>Recomendações: </strong> {recommendation}
        </p>
        <br />
      </StyledContainer>
  );
}
