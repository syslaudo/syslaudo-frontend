import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { Navlinks } from '../Navlinks';
import { ProfileSubmenu } from '../ProfileSubmenu';
import { StyledDesktopNavbar } from './styles';

interface NavbarProps {
  toggleMobile: () => void;
}

export function DesktopNavbar(props: NavbarProps) {
  return (
    <StyledDesktopNavbar
    >
      <div>
        <Link to="/inicio">
          <Logo className="svg" />
        </Link>
        <Navlinks />
        <ProfileSubmenu />
        <button
          onClick={props.toggleMobile}
          onMouseDown={(e) => e.preventDefault()}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </StyledDesktopNavbar>
  );
}
