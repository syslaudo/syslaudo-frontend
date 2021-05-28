import { StyledButton } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
}

export function Button(props: ButtonProps) {
  return (
    <StyledButton
      primary={props.primary}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </StyledButton>
  );
}
