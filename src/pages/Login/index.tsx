import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormComponents } from '../../components/FormComponents';
import { signIn } from '../../services/auth';
import { LoginForm } from './styles';
import { ReactComponent as Logo } from '../../assets/logo.svg';

const { Button, ButtonGroup, Input } = FormComponents;

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    try {
      await signIn({ email, password });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <LoginForm onSubmit={handleSignIn}>
        <div className="logo">
          <Logo className="svg" />
        </div>
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
        <p className="link">
          <Link
            to="#"
            onClick={() =>
              alert(
                'Para resetar sua senha, entre em contato com o setor de TI.',
              )
            }
          >
            Esqueceu sua senha?
          </Link>
        </p>
        <ButtonGroup>
          <Button primary type="submit">
            Login
          </Button>
        </ButtonGroup>
      </LoginForm>
    </>
  );
}
