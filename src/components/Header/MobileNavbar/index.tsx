import { Navlinks } from "../Navlinks";
import { ProfileSubmenu } from "../ProfileSubmenu";
import { StyledMobileNavbar } from "./styles";

interface MobileNavbarProps {
  displayMobile: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export function MobileNavbar(props: MobileNavbarProps) {
  return (
    <StyledMobileNavbar
      displayMobile={props.displayMobile}
      isAuthenticated={props.isAuthenticated}
      isAdmin={props.isAdmin}
    >
      <Navlinks />
      <ProfileSubmenu />
    </StyledMobileNavbar>
  );
}
