import styled from "styled-components";
import { StyledForm } from "../../../components/FormComponents/Form/styles";

export const StyledUserForm = styled(StyledForm)<{ userType?: string }>`
  .inputMedico {
    display: ${(props) =>
      props.userType === "Administrador" ? "none" : "block"};
  }

  .inputResidente {
    display: ${(props) => (props.userType === "Residente" ? "block" : "none")};
  }

  .inputProfessor {
    display: ${(props) => (props.userType === "Professor" ? "block" : "none")};
  }
`;
