import { FormComponents } from "../../components/FormComponents";

const {
  Form,
  Button,
  ButtonGroup,
  Input,
  RadioButton,
  RadioGroup,
} = FormComponents;

export function PacientCreate() {
  return (
    <>
      <h1>Cadastro de Paciente</h1>
      <Form>
        <Input id="registro" label="Registro" />
        <Input id="nome" label="Nome" />
        <Input id="data-nascimento" label="Data de Nascimento" type="date" />

        <RadioGroup id="sexo" label="Sexo">
          <RadioButton
            name="sexo"
            id="Masculino"
            value="Masculino"
            defaultChecked
          />
          <RadioButton name="sexo" id="Feminino" value="Feminino" />
          <RadioButton name="sexo" id="Outro" value="Outro" />
          <RadioButton name="sexo" id="Não informar" value="Não informado" />
        </RadioGroup>

        <RadioGroup id="cor" label="Cor">
          <RadioButton name="cor" id="Branco" value="Branco" defaultChecked />
          <RadioButton name="cor" id="Pardo" value="Pardo" />
          <RadioButton name="cor" id="Preto" value="Negro" />
          <RadioButton name="cor" id="Amarelo" value="Amarelo" />
          <RadioButton name="cor" id="Indígena" value="Indígena" />
          <RadioButton name="cor" id="Não informar" value="Não informado" />
        </RadioGroup>

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
