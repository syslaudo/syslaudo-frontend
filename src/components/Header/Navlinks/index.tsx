import { Link } from 'react-router-dom';
import { Can } from '../../Can';

export function Navlinks() {
  return (
    <ul className="navlinks">
      <li>
        <Link to="/inicio">INÍCIO</Link>
      </li>

      <li>
        <Link to="/pacientes">PACIENTES</Link>
      </li>

      <li>
        <span>
          EXAMES &nbsp; <i className="mob-hidden fas fa-caret-down"></i>
        </span>
        <ul>
          <Link to="/exames/agendados">Agendados</Link>
          <Link to="/exames/cancelados">Cancelados</Link>
          <Link to="/exames/pendentes">Laudo Pendente</Link>
          <Link to="/exames/provisorios">Laudo Provisório</Link>
          <Link to="/exames/concluidos">Finalizados</Link>
        </ul>
      </li>

      <Can authorizedTypes={['Administrador']}>
        <li>
          <Link to="/medicos">MÉDICOS</Link>
        </li>
        <li>
          <Link to="/usuarios">USUÁRIOS</Link>
        </li>
      </Can>
    </ul>
  );
}
