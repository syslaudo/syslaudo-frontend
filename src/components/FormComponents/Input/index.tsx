import React from "react";
import ReactInputMask, { Props as MaskedInputProps } from "react-input-mask";
import { StyledInput } from "./styles";

interface InputProps extends MaskedInputProps {
  label: string;
  mask_?: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <StyledInput className={className}>
      <label htmlFor={props.id}>{label}</label>
      <ReactInputMask {...props} />
    </StyledInput>
  );
}
