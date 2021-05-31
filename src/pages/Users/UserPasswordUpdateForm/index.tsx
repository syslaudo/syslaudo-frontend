import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { FormComponents } from '../../../components/FormComponents';
import { useUsers } from '../../../hooks/useUsers';

const { Form, Button, ButtonGroup, Input } = FormComponents;

export function UserPasswordUpdateForm() {
  const { users, updateUser } = useUsers();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  function handleReset() {
    setEmail('');
    setPassword('');
    setPasswordCheck('');
  }

  async function handleUpdateUser(event: FormEvent) {
    event.preventDefault();

    const editingUser = users.find((user) => user.email === email);

    try {
      if (!editingUser) {
        toast.error('Não há usuário com esse e-mail no banco de dados');
        return;
      }

      const user = { ...editingUser, password };

      await updateUser(editingUser.id, user);
      handleReset();
      toast.success('Senha atualizado com sucesso!');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <h1>Atualização de Senha</h1>
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
        <Input
          id="password"
          label="Senha"
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
    </>
  );
}
