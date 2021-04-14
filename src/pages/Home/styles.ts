import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--hover);
  border-left: 5px solid var(--primary);
  background: var(--background);
  border-radius: 10px;
  box-shadow: 0 0 20px var(--shadow);
  min-height: 8rem;
  padding: 1.5rem;
  margin-bottom: 2rem;

  span {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

export const CardGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2rem;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
