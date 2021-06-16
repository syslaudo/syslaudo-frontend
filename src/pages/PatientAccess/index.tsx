import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { FormComponents } from '../../components/FormComponents';
import { useExams } from '../../hooks/useExams';
import { LoginForm } from './styles';

const { Button, ButtonGroup, Input } = FormComponents;

export function PatientAccess() {
  const { getResult } = useExams();
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e: any) => {
    e.preventDefault();

    const cpfInput = cpf.replace(/[^0-9]+/g, '');

    try {
      const exam = await getResult(cpfInput, password);

      if (!exam) {
        toast.error('Exam not in database.');
        return;
      }

      window.open(
        `/printpatient?date=${exam.date}&cpf=${exam.cpf}&type=${exam.type}&status=${exam.status}&hipotesys=${exam.hypotesis}&report=${exam.report}&image=${exam.image}&name=${exam.name}`,
        '_blank',
      );
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
        <h5>Consulta de Resultados</h5>
        <Input
          id="cpf"
          label="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
          mask="999.999.999-99"
        />
        <Input
          id="password"
          label="Senha do Exame"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mask=""
        />
        <ButtonGroup>
          <Button primary type="submit">
            Enviar
          </Button>
        </ButtonGroup>
      </LoginForm>
    </>
  );
}
