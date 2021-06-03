import { Link } from 'react-router-dom';
import { loggedUser, signOut } from '../../../services/auth';
import { Can } from '../../Can';

export function ProfileSubmenu() {
  return (
    <ul className="profile">
      <li>
        <div>
          <span>{loggedUser.name?.split(' ')[0]} &nbsp;&nbsp;</span>
          <span className="mob-hidden">
            <i className="mob-hidden far fa-user-circle"></i>
          </span>
        </div>
        <ul>
          <Can authorizedTypes={['Administrador']}>
            <Link to="/trocar-senha">Trocar senha</Link>
          </Can>
          <Link to="/inicio" onClick={signOut}>
            Sair
          </Link>
        </ul>
      </li>
    </ul>
  );
}
