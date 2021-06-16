import dateFormat from 'dateformat';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { StyledContainer } from './styles';

export function InfoPrintPatient(props: any) {

  const search = new URLSearchParams(props.location.search);
  const image = search.get('image');
  const name = search.get('name');
  const type = search.get('type');
  const report = search.get('report');
  const cpf = search.get('cpf');
  const date = search.get('date');


  return (
    <StyledContainer>
      <div className="logo">
        <Logo className="svg" />
      </div>

      <div>
        <h1>Resultado - {type}</h1>
      </div>

      <p>
        <strong>Paciente: </strong> {name}
      </p>
      <p>
        <strong>CPF: </strong>{' '}
        {cpf?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
      </p>
      <p>
        <strong>Tipo do Exame: </strong> {type}
      </p>
      <p>
        <strong>Data: </strong>{' '}
        {date ? dateFormat(new Date(date), 'dd/mm/yyyy', true) : ''}
      </p>
      <p>
        <strong>Laudo: </strong> {report ? report : 'Laudo pendente'}
      </p>
      <br />

      {image ? (
        <iframe
          src={image}
          title="Imagem do exame"
          width="100%"
          height="800px"
        />
      ) : (
        ''
      )}
    </StyledContainer>
  );
}
