import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormComponents } from '../../components/FormComponents';
import { signIn } from '../../services/auth';
import { LoginForm } from './styles';

const { Button, ButtonGroup, Input } = FormComponents;

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    try {
      await signIn({ email, password });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LoginForm onSubmit={handleSignIn}>
        <h5>Login</h5>
        <Input
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mask=""
        />
        <Input
          id="password"
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mask=""
        />
        <Link
          to="#"
          onClick={() =>
            alert('Para resetar sua senha, entre em contato com o setor de TI.')
          }
        >
          <p>Esqueceu sua senha?</p>
        </Link>
        <ButtonGroup>
          <Button primary type="submit">
            Login
          </Button>
        </ButtonGroup>
      </LoginForm>
    </>
  );
}
