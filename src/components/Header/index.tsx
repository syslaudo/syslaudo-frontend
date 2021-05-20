import { useEffect, useState } from 'react';
import { DesktopNavbar } from './DesktopNavbar';
import { MobileNavbar } from './MobileNavbar';
import { useHistory } from 'react-router-dom';
import { isAuthenticated, loggedUser } from '../../services/auth';

export function Header() {
  const [displayMobile, setDisplayMobile] = useState(false);

  const history = useHistory();
  
  useEffect(() => {
    return history.listen(() => {
      setDisplayMobile(false);
    });
  }, [history]);

  const toggleMobile = () => {
    displayMobile ? setDisplayMobile(false) : setDisplayMobile(true);
  };

  return (
    <div>
      <DesktopNavbar
        toggleMobile={toggleMobile}
        isAuthenticated={isAuthenticated}
        isAdmin={loggedUser.type === 'Administrador'}
      />
      <MobileNavbar
        displayMobile={displayMobile}
        isAuthenticated={isAuthenticated}
        isAdmin={loggedUser.type === 'Administrador'}
      />
    </div>
  );
}
