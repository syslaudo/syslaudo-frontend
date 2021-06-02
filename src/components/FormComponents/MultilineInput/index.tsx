import { StyledMultilineInput } from './styles';

interface MultilineInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function MultilineInput(props: MultilineInputProps) {
  return (
    <StyledMultilineInput>
      <label htmlFor={props.id}>{props.label}</label>
      <textarea {...props} />
    </StyledMultilineInput>
  );
}
