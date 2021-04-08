import { ReactNode } from "react";
import { StyledTabs } from "./styles";
import { Tabs as ReactTabs } from "react-tabs";

interface TabsProps {
  children: ReactNode;
}

export function Tabs(props: TabsProps) {
  return (
    <StyledTabs>
      <ReactTabs>{props.children}</ReactTabs>
    </StyledTabs>
  );
}
