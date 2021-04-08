import styled from "styled-components";
import { StyledForm } from "../../../components/FormComponents/Form/styles";

export const StyledDoctorForm = styled(StyledForm)<{ doctorType?: string }>`
  .inputResidente {
    display: ${(props) =>
      props.doctorType === "Residente" ? "block" : "none"};
  }

  .inputProfessor {
    display: ${(props) =>
      props.doctorType === "Professor" ? "block" : "none"};
  }
`;
