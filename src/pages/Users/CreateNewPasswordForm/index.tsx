import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { FormComponents } from '../../../components/FormComponents';
import { useUsers } from '../../../hooks/useUsers';
import { loggedUser } from '../../../services/auth';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { StyledContainer } from './styles';
import { Link } from 'react-router-dom';


const { Form, Button, ButtonGroup, Input } = FormComponents;

export function CreateNewPasswordForm() {
  // const { requestPasswordReset } = useUsers();
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');


  function handleReset() {
    setPassword('');
  }

  async function handleUpdateUser(event: FormEvent) {
    event.preventDefault();

    try {
      // await requestPasswordReset(email);
      handleReset();
      toast.success('Senha alterada com sucesso!');
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
          id="password"
          label="Nova senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          required
          pattern="\S{6,}"
          title="Mínimo de 6 dígitos"
          mask=""
        />

        <Input
          id="password-check"
          label="Confirme a senha"
          value={passwordCheck}
          onChange={(event) => setPasswordCheck(event.target.value)}
          type="password"
          required
          pattern={password}
          title="Senhas não conferem"
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
