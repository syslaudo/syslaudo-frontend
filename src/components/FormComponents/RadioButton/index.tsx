import { StyledRadioButton } from './styles';

interface RadioButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    React.ClassAttributes<HTMLInputElement> {}

export function RadioButton(props: RadioButtonProps) {
  return (
    <StyledRadioButton>
      <input
        type="radio" {...props} />
      <span>{props.id}</span>
    </StyledRadioButton>
  );
}
