import styled from 'styled-components';

export const StyledContainer = styled.div`
  div.logo {
    display: flex;
    align-items: center;

    .svg {
      height: 8rem;
      margin: 5rem auto;

      @media screen and (max-width: 950px) {
        max-height: 10vh;
        margin: 0rem auto 3rem;
      }
    }
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--hover);
  border-left: 5px solid var(--primary);
  background: var(--background);
  border-radius: 10px;
  box-shadow: 0 0 20px var(--shadow);
  min-height: 12rem;
  padding: 1.5rem;
  margin-bottom: 2rem;

  span {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .svg {
    max-width: 80%;
    max-height: 25vh;
    margin-bottom: 2rem;

    @media screen and (max-width: 950px) {
      max-height: 18vh;

  }
  }
`;

export const CardGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 3rem;
  margin-top: calc((50vh - 24.5rem) / 2);

  @media screen and (max-width: 950px) {
    grid-template-columns: 1fr;
    margin-top: 0px;
  }
`;
