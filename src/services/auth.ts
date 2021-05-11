import api from './api';

interface SignInCredentials {
  email: string;
  password: string;
}

export const isAuthenticated = localStorage.getItem('TOKEN') !== null;
export const token = localStorage.getItem('TOKEN');

export async function signIn({ email, password }: SignInCredentials) {
  try {
    const response = await api.post('session/login', {
      email_usuario: email,
      senha: password,
    });
    const { token, user } = response.data;

    localStorage.setItem('TOKEN', token);
    localStorage.setItem('USER.ID', user.id);
    localStorage.setItem('USER.EMAIL', user.email_usuario);
    localStorage.setItem('USER.NAME', user.nome);
    localStorage.setItem('USER.TYPE', user.tipo);


  } catch (err) {
    console.log(err);
  }
}

export const loggedUser = {
  id: localStorage.getItem('USER.ID'),
  email: localStorage.getItem('USER.EMAIL'),
  name: localStorage.getItem('USER.NAME'),
  type: localStorage.getItem('USER.TYPE'),
};

export function signOut() {
  localStorage.removeItem('TOKEN');
  localStorage.removeItem('USER.ID');
  localStorage.removeItem('USER.EMAIL');
  localStorage.removeItem('USER.NAME');
  localStorage.removeItem('USER.TYPE');
  window.location.reload();
}
