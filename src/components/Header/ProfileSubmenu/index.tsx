import { Link } from 'react-router-dom';
import { loggedUser, signOut } from '../../../services/auth';

export function ProfileSubmenu() {
  return (
    <ul className="profile">
      <li>
        <div>
          <span className="mob-hidden">{loggedUser.name?.split(' ')[0]} &nbsp;&nbsp;</span>
          <span className="mob-hidden">
            <i className="mob-hidden far fa-user-circle"></i>
          </span>
        </div>
        <ul className="logoutButton">
          <Link to="/inicio" onClick={signOut}>
            Sair
          </Link>
        </ul>
      </li>
    </ul>
  );
}
