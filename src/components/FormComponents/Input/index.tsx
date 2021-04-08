import React from "react";
import { StyledInput } from "./styles";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    React.ClassAttributes<HTMLInputElement> {
  label: string;
}

export function Input(props: InputProps) {
  return (
    <StyledInput className={props.className}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        placeholder={props.placeholder}
        type={props.type}
        disabled={props.disabled}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        required={props.required}
      />
    </StyledInput>
  );
}
