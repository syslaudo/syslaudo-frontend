import { StyledForm } from './styles';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export function Form(props: FormProps) {
  return <StyledForm onSubmit={props.onSubmit}>{props.children}</StyledForm>;
}
