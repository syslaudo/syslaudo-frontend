import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;

  .svg {
    height: 4rem;
  }

  > div {
    margin: 2rem auto;
  }

  > p {
    margin: 0.5rem;
  }

  a > p {
    text-align: right;
  }

  iframe {
    margin: 3rem auto;
  }
`;
