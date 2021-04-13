import { Link } from "react-router-dom";

export function Navlinks() {
  return (
    <ul className="navlinks">
      <li>
        <Link to="/inicio">INÍCIO</Link>
      </li>

      <li>
        <Link to="/medicos">MÉDICOS</Link>
      </li>

      <li>
        <Link to="/pacientes">PACIENTES</Link>
      </li>

      <li>
        <Link to="/exames">EXAMES</Link>
      </li>
    </ul>
  );
}
