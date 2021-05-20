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
          <a href="/exames/agendados">Agendados</a>
          <a href="/exames/cancelados">Cancelados</a>
          <a href="/exames/pendentes">Laudo Pendente</a>
          <a href="/exames/provisorios">Laudo Provisório</a>
          <a href="/exames/concluidos">Finalizados</a>
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
