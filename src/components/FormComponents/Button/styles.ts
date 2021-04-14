import styled from 'styled-components';

export const StyledButton = styled.button<{ primary?: boolean }>`
  padding: 0.5rem 1.5rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.primary ? 'var(--background)' : 'var(--text)')};
  background: ${(props) =>
    props.primary ? 'var(--primary)' : 'var(--background)'};
  transition: 0.1s;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.primary ? 'var(--primary)' : 'var(--text)'};
  font-size: 1rem;
  text-transform: uppercase;

  :hover {
    background: var(--primary-hover);
    color: var(--background);
    border-color: var(--primary-hover);
  }

  :focus {
    outline: none;
    border: 1px solid var(--primary);
    box-shadow: 0 0 0 2px var(--primary-shadow);
  }
`;
