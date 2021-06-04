import { Link } from 'react-router-dom';
import { Card, CardGroup } from './styles';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { StyledContainer } from './styles';
import { ReactComponent as Doctors } from '../../assets/undraw_doctors_hwty.svg';
import { ReactComponent as Patients } from '../../assets/undraw_injured_9757.svg';


export function Home() {
  return (
    <StyledContainer>
      <div className="logo">
        <Logo className="svg" />
      </div>
      <CardGroup>
        <Link to="/acesso-paciente">
          <Card>
            <Patients className="svg" />
            <span>Paciente</span>
          </Card>
        </Link>
        <Link to="/login">
          <Card>
          <Doctors className="svg" />

            <span>Médico</span>
          </Card>
        </Link>
      </CardGroup>
    </StyledContainer>
  );
}
