import { ReactNode } from 'react';
import { useCan } from '../../hooks/useCan';

interface CanProps {
  children: ReactNode;
  authorizedTypes: string[];
}

export function Can({ children, authorizedTypes }: CanProps) {
  const userCanSeeComponent = useCan({ authorizedTypes });
  
  if (!userCanSeeComponent) {
    return null;
  }

  return <>{children}</>;
}
