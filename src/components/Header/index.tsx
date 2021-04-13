import { useEffect, useState } from "react";
import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";
import { useHistory } from "react-router-dom";
import { isAuthenticated } from "../../services/Auth";

export function Header() {
  const [displayMobile, setDisplayMobile] = useState(false);

  const privileges = localStorage.getItem("FUNCTION");
  const isAdmin = privileges === "admin";

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
        isAuthenticated={isAuthenticated()}
        isAdmin={isAdmin}
      />
      <MobileNavbar
        displayMobile={displayMobile}
        isAuthenticated={isAuthenticated()}
        isAdmin={isAdmin}
      />
    </div>
  );
}
