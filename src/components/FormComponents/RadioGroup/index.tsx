import { StyledRadioGroup } from "./styles";

interface RadioGroupProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
}

export function RadioGroup(props: RadioGroupProps) {
  return (
    <StyledRadioGroup className={props.className}>
      <label htmlFor={props.id}>{props.label}</label>
      <div>{props.children}</div>
    </StyledRadioGroup>
  );
}
