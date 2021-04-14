export const isAuthenticated = () => localStorage.getItem("TOKEN") !== null;
export const getToken = () => localStorage.getItem("TOKEN");
export const login = (token: string) => {
  localStorage.setItem("TOKEN", token);
};
export const logout = () => {
  localStorage.removeItem("TOKEN");
};
export const setUserName = (username: string) => {
  localStorage.setItem("USERNAME", username);
};
export const setPermission = (permission: string) => {
  localStorage.setItem("FUNCTION", permission);
};
