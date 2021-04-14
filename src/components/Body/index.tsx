import { StyledBody } from './styles';

interface BodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Body(props: BodyProps) {
  return (
    <StyledBody>
      <div>{props.children}</div>
    </StyledBody>
  );
}
