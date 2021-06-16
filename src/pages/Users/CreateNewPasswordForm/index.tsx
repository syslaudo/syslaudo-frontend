import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { FormComponents } from '../../../components/FormComponents';
import { useUsers } from '../../../hooks/useUsers';
import { loggedUser } from '../../../services/auth';
import { StyledContainer } from './styles';

const { Form, Button, ButtonGroup, Input } = FormComponents;

export function CreateNewPasswordForm(props: any) {
  const { changePassword } = useUsers();
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  function handleReset() {
    setPassword('');
  }

  const search = new URLSearchParams(props.location.search);
  const token = search.get('token');
  const id = search.get('id');

  async function handleUpdateUser(event: FormEvent) {
    event.preventDefault();

    try {
      if (token && id) {
        await changePassword(password, passwordCheck, token, id);
      } else {
        throw new Error('Usuário inválido')
      }
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
