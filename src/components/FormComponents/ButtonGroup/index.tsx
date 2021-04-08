import { ReactNode } from "react";
import { StyledButtonGroup } from "./styles";

interface ButtonGroupProps {
  children: ReactNode;
}

export function ButtonGroup(props: ButtonGroupProps) {
  return <StyledButtonGroup>{props.children}</StyledButtonGroup>;
}
