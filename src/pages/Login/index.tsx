import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FormComponents } from "../../components/FormComponents";
import { LoginForm } from "./styles";
import syslaudoApi from "../../services/syslaudoApi";
import { login, setPermission, setUserName } from "../../services/Auth";

const { Button, ButtonGroup, Input } = FormComponents;

export function Login() {
  const [email_usuario, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const history = useHistory();

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    try {
      const response = await syslaudoApi.post("/session/login", {
        email_usuario,
        senha,
      });
      login(response.data.token);
      setUserName(response.data.user.nome);
      setPermission(response.data.user.funcao);
      history.push("/inicio");
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
          value={email_usuario}
          onChange={(e) => setEmail(e.target.value)}
          mask=""
        />
        <Input
          id="password"
          label="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          mask=""
        />
        <Link
          to="#"
          onClick={() =>
            alert("Para resetar sua senha, entre em contato com o setor de TI.")
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
