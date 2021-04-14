import styled from 'styled-components';

export const StyledSelect = styled.div`
  display: block;
  width: 100%;
  margin: 2rem auto;

  label {
    margin-bottom: 0.5em;
    display: block;
  }

  select {
    padding: 0.6rem;
    color: var(--text);
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    border: 1px solid var(--text);
    background: var(--background);
    border-radius: 5px;
    width: 100%;
    margin-bottom: 0.5em;

    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

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

    background-image: linear-gradient(45deg, transparent 50%, gray 50%),
      linear-gradient(135deg, gray 50%, transparent 50%),
      radial-gradient(transparent 100%, transparent 72%);
    background-position: calc(100% - 20px) calc(1.2rem),
      calc(100% - 15px) calc(1.2rem), calc(100% - 0.5rem) 0.5rem;
    background-size: 5px 5px, 5px 5px, 1.5rem 1.5rem;
    background-repeat: no-repeat;
  }
`;
