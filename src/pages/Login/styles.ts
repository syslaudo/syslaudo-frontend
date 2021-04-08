import styled from "styled-components";
import { StyledForm } from "../../components/FormComponents/Form/styles";

export const LoginForm = styled(StyledForm)`
  margin-top: 5vh;
  margin-bottom: 5vh;
  width: 50%;
  background: var(--background);
  border: 1px solid var(--hover);
  border-left: 5px solid var(--primary);
  padding: 3rem 5rem;
  border-radius: 10px;
  box-shadow: 0 0 20px var(--shadow);

  h5 {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    color: var(--primary);
  }

  p {
    position: relative;
    font-size: 0.9rem;
    text-align: right;
    top: -2rem;
    color: var(--primary);
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    padding: 1rem;
    border: none;
    box-shadow: none;
  }
`;
