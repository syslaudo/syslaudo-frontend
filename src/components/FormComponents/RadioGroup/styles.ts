import styled from "styled-components";

export const StyledRadioGroup = styled.div`
  display: block;
  width: 100%;
  margin: 2rem auto;

  label {
    margin-bottom: 0.5em;
    display: block;
  }

  > div {
    display: flex;
    justify-content: flex-start;

    @media screen and (max-width: 900px) {
      flex-direction: column;
      padding: 0;
    }
  }
`;
