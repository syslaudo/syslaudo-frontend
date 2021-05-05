import { FormComponents } from '../../../components/FormComponents';

const { Form, Button, ButtonGroup, Input, MultilineInput } = FormComponents;

export function ExamCreateForm() {
  return (
    <>
      <h1>Cadastro de Exame</h1>
      <Form>
        <Input id="nome" label="Nome do Exame" mask="" />
        <MultilineInput id="crm" label="Recomendações" />

        <ButtonGroup>
          <Button type="submit" primary>
            Enviar
          </Button>
          <Button>Limpar</Button>
        </ButtonGroup>
      </Form>
    </>
  );
}
