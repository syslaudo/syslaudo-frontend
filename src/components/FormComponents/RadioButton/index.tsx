import { StyledRadioButton } from './styles';

interface RadioButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    React.ClassAttributes<HTMLInputElement> {}

export function RadioButton(props: RadioButtonProps) {
  return (
    <StyledRadioButton>
      <input
        type="radio"
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        checked={props.checked}
        defaultChecked={props.defaultChecked}
      />
      <span>{props.id}</span>
    </StyledRadioButton>
  );
}
