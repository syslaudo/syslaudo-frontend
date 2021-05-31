import { Link } from 'react-router-dom';
import { Card, CardGroup } from './styles';

export function Home() {
  return (
    <>
      <h1>Cadastro</h1>
      <CardGroup>
        <Link to="/pacientes">
          <Card>
            <span>Cadastrar Paciente</span>
          </Card>
        </Link>
        <Link to="/exames/agendados">
          <Card>
            <span>Agendar Exame</span>
          </Card>
        </Link>
      </CardGroup>

      <h1>Exames</h1>
      <CardGroup>
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
