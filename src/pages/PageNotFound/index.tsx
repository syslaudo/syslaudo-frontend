import { ReactComponent as PageNotFoundImg } from '../../assets/undraw_not_found_60pq.svg';
import { PageNotFoundContainer } from './style';

export function PageNotFound() {
  return (
    <PageNotFoundContainer>
      <p>Erro 404 - Página não encontrada</p>
      <PageNotFoundImg className="svg" />
    </PageNotFoundContainer>
  );
}
