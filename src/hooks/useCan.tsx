import { loggedUser, isAuthenticated } from '../services/auth';

type UseCanParams = {
  authorizedTypes: string[];
};

export function useCan({ authorizedTypes }: UseCanParams) {
  if (!isAuthenticated) {
    return false;
  }

  if (authorizedTypes?.length > 0) {
    const allowed = authorizedTypes.find((type) => loggedUser.type === type);

    if (!allowed) {
      return false;
    }
  }

  return true;
}
