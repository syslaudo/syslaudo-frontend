import styled from "styled-components";

export const StyledBody = styled.div`
  > div {
    max-width: 1120px;
    margin: 0 auto;
    padding: 3rem;
    min-height: calc(100vh - 5rem - 23rem);
    @media screen and (max-width: 1000px) {
      padding: 3rem 1.5rem;
    }

    h1 {
      text-transform: uppercase;
    }
  }
`;
