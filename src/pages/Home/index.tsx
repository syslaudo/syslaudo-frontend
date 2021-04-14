import { Link } from 'react-router-dom';
import { Card, CardGroup } from './styles';

export function Home() {
  return (
    <>
      <h1>Solicitações</h1>
      <CardGroup>
        <Link to="/pacientes">
          <Card>
            <span>Cadastrar Paciente</span>
          </Card>
        </Link>
        <Link to="/exames">
          <Card>
            <span>Solicitar Exame</span>
          </Card>
        </Link>
      </CardGroup>

      <h1>Exames</h1>
      <CardGroup>
        <Link to="/exames">
          <Card>
            <span>Lista de Exames</span>
          </Card>
        </Link>
        <Link to="/exames">
          <Card>
            <span>Exames Pendentes</span>
          </Card>
        </Link>
        <Link to="/exames">
          <Card>
            <span>Laudos Pendentes</span>
          </Card>
        </Link>
        <Link to="/exames">
          <Card>
            <span>Laudos Aprovados</span>
          </Card>
        </Link>
      </CardGroup>
    </>
  );
}
