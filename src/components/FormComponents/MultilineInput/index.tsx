import { StyledMultilineInput } from './styles';

interface MultilineInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function MultilineInput(props: MultilineInputProps) {
  return (
    <StyledMultilineInput>
      <label htmlFor={props.id}>{props.label}</label>
      <textarea
        id={props.id}
        placeholder={props.placeholder}
        disabled={props.disabled}
        value={props.value}
        onChange={props.onChange}
      />
    </StyledMultilineInput>
  );
}
