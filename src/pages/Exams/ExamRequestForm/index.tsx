import { FormComponents } from "../../../components/FormComponents";
import { MultilineInput } from "../../../components/FormComponents/MultilineInput";

const {
  Form,
  Button,
  ButtonGroup,
  Input,
  RadioButton,
  RadioGroup,
} = FormComponents;

export function ExamRequestForm() {
  return (
    <>
      <h1>Solicitação de Exame</h1>
      <Form>
        <Input id="cpf-paciente" label="CPF do Patiente" mask="" />
        <Input id="nome" label="Nome do Patiente" mask="" disabled />

        <RadioGroup id="tipo" label="Exame">
          <RadioButton
            name="tipo"
            id="Ecocardiograma"
            value="Ecocardiograma"
            defaultChecked
          />
          <RadioButton
            name="tipo"
            id="Eletrocardiograma"
            value="Eletrocardiograma"
          />
          <RadioButton name="tipo" id="Mapa" value="Mapa" />
          <RadioButton name="tipo" id="Router" value="Router" />
        </RadioGroup>

        <Input id="data-prevista" label="Data Prevista" type="date" mask="" />
        <MultilineInput id="hipotese" label="Hipótese Diagnosticada - CID" />

        <MultilineInput id="recomendações" label="Recomendações" />

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
