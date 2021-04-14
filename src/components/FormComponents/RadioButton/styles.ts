import styled from 'styled-components';

export const StyledRadioButton = styled.label`
  display: flex;
  margin-right: 2rem;
  padding: 0.6rem 0;
  border-radius: 5px;

  input {
    display: none;
  }

  span {
    border: 1px solid var(--text);
    padding: 0.6rem;
    border-radius: 5px;
    white-space: nowrap;
  }

  input:checked + span {
    color: var(--primary);
    border: 1px solid var(--primary);
    box-shadow: 0 0 0 2px var(--primary-shadow);
  }

  @media screen and (max-width: 900px) {
    width: 100%;

    span {
      display: flex;
      width: 100%;
      justify-content: center;
    }
  }
`;
