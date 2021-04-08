import { Link } from "react-router-dom";
import { logout } from '../../../services/Auth';

export function ProfileSubmenu() {

  const nomeUserName = localStorage.getItem('USERNAME');

  const logoutUser = () => {
    localStorage.removeItem('USERNAME');
    logout();
    window.location.reload();
  }

  return (
    <ul className="profile">
      <li>
        <div>
          <span>{nomeUserName} &nbsp;&nbsp;</span>
          <span>
            <i className="far fa-user-circle"></i>
          </span>
        </div>
        <ul>
          <Link to="/configuracoes">Configurações</Link>
          <Link to="/inicio" onClick={logoutUser}>Sair</Link>
        </ul>
      </li>
    </ul>
  );
}
