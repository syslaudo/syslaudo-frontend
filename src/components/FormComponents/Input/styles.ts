import styled from "styled-components";

export const StyledInput = styled.div`
  display: block;
  width: 100%;
  margin: 2rem auto;

  label {
    margin-bottom: 0.5em;
    display: block;
  }

  input {
    padding: 0.6rem;
    color: var(--text);
    font-family: "Open Sans", sans-serif;
    font-size: 1rem;
    border: 1px solid var(--text);
    background: var(--background);
    border-radius: 5px;
    width: 100%;
    margin-bottom: 0.5em;

    &:disabled {
      background: var(--hover);
    }

    &:invalid {
      border: 1px solid var(--text);
      box-shadow: none;
    }

    &:focus {
      outline: none;
      border: 1px solid var(--primary);
      box-shadow: 0 0 0 2px var(--primary-shadow);
    }

    &::placeholder {
      color: var(--text-fade);
    }
  }
`;
