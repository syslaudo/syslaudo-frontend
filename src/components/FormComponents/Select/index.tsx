import React from 'react';
import { StyledSelect } from './styles';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export function Select(props: SelectProps) {
  return (
    <StyledSelect className={props.className}>
      <label htmlFor={props.id}>{props.label}</label>
      <select {...props} >
        {props.children}
      </select>
    </StyledSelect>
  );
}
