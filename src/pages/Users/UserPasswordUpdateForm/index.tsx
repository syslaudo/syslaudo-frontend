import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { FormComponents } from '../../../components/FormComponents';
import { useUsers } from '../../../hooks/useUsers';
import { loggedUser } from '../../../services/auth';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { StyledContainer } from './styles';
import { Link } from 'react-router-dom';


const { Form, Button, ButtonGroup, Input } = FormComponents;

export function UserPasswordUpdateForm() {
  const { requestPasswordReset } = useUsers();
  const [email, setEmail] = useState(loggedUser?.email ? loggedUser.email : '');

  function handleReset() {
    setEmail(loggedUser?.email ? loggedUser.email : '');
  }

  async function handleUpdateUser(event: FormEvent) {
    event.preventDefault();

    try {
      await requestPasswordReset(email);
      handleReset();
      toast.success('Solicitação enviada com sucesso!');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <StyledContainer>
      {!loggedUser.id && (
        <Link to="/" className="logo">
            <Logo className="svg" />
        </Link>
      )}

      <h1>Redefinição de Senha</h1>
      <Form onSubmit={handleUpdateUser}>
        <Input
          id="email"
          label="e-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          required
          mask=""
        />

        <ButtonGroup>
          <Button type="submit" primary>
            Enviar
          </Button>
          <Button type="button" onClick={handleReset}>
            Descartar
          </Button>
        </ButtonGroup>
      </Form>
    </StyledContainer>
  );
}
