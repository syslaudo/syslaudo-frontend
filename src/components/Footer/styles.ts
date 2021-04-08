import styled from "styled-components";

export const StyledFooter = styled.footer`
  background: var(--background-dark);
  color: var(--text-dark);
  max-width: 100vw;

  > div {
    max-width: 1120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    height: 23rem;

    > p {
      margin: 0 auto 1rem auto;
    }

    table {
      margin: 2rem auto;
      min-width: 30vw;
    }

    th {
      font-weight: bold;
      text-transform: uppercase;
    }

    th:first-child {
      text-align: left;
    }

    tr > td:last-child {
      text-align: center;
    }

    th {
      padding: 0 1rem 1rem 1rem;
    }

    td {
      padding: 0.2rem 1rem;
    }

    a {
      transition: 0.2s;

      &:hover {
        filter: brightness(0.8);
      }
    }
  }
`;
