import { Link } from 'react-router-dom';
import { Card, CardGroup } from './styles';

export function Dashboard() {
  return (
    <>
      <CardGroup>
        <Link to="/pacientes">
          <Card>
            <span>Cadastro de Pacientes</span>
          </Card>
        </Link>
        <Link to="/exames/agendados">
          <Card>
            <span>Agendamento de Exames</span>
          </Card>
        </Link>
        <Link to="/exames/cancelados">
          <Card>
            <span>Exames Cancelados</span>
          </Card>
        </Link>
        <Link to="/exames/pendentes">
          <Card>
            <span>Exames com Laudo Pendente</span>
          </Card>
        </Link>
        <Link to="/exames/provisorios">
          <Card>
            <span>Exames com Laudo Provisório</span>
          </Card>
        </Link>
        <Link to="/exames/concluidos">
          <Card>
            <span>Exames Concluídos</span>
          </Card>
        </Link>
      </CardGroup>
    </>
  );
}
