import { Navlinks } from '../Navlinks';
import { ProfileSubmenu } from '../ProfileSubmenu';
import { StyledMobileNavbar } from './styles';

interface MobileNavbarProps {
  displayMobile: boolean;
}

export function MobileNavbar(props: MobileNavbarProps) {
  return (
    <StyledMobileNavbar
      displayMobile={props.displayMobile}
    >
      <Navlinks />
      <ProfileSubmenu />
    </StyledMobileNavbar>
  );
}
