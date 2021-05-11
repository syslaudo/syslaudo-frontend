import { CardGroup, Card } from './styles';
import { Link } from 'react-router-dom';

export function Exams() {
  return (
    <>
      <h1>Exames</h1>
      <CardGroup>
        <Link to="/exames/agendados">
          <Card>
            <span>Agendados</span>
          </Card>
        </Link>
        <Link to="/exames/cancelados">
          <Card>
            <span>Cancelados</span>
          </Card>
        </Link>
        <Link to="/exames/pendentes">
          <Card>
            <span>Laudo Pendente</span>
          </Card>
        </Link>
        <Link to="/exames/provisorios">
          <Card>
            <span>Laudo Provisório</span>
          </Card>
        </Link>
        <Link to="/exames/concluidos">
          <Card>
            <span>Concluidos</span>
          </Card>
        </Link>
      </CardGroup>
    </>
  );
}
