import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';
import { loggedUser } from '../services/auth';

interface User {
  id: string;
  cpf: string;
  email: string;
  password?: string;
  name: string;
  type: string;
  crm?: string;
  residencyDate?: string;
  title?: string;
}

type UserInput = Omit<User, 'id'>;

interface UsersContextData {
  users: User[];
  createUser: (userInput: UserInput) => Promise<void>;
  removeUser: (userId: string) => Promise<void>;
  updateUser: (userId: string, userInput: UserInput) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  changePassword: (password: string, passwordCheck: string, token:string, id:string) => Promise<void>;
}

interface UsersProviderProps {
  children: ReactNode;
}

const UsersContext = createContext<UsersContextData>({} as UsersContextData);

export function UsersProvider({ children }: UsersProviderProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/usuario/listAll');

      const users = response.data.map(
        (user: any) =>
          (user = {
            id: user.id,
            cpf: user.cpf,
            email: user.email_usuario,
            password: user.senha,
            name: user.nome_do_usuario,
            type: user.tipo,
            crm: user.crm,
            residencyDate: user.data_residencia,
            title: user.titulacao,
          }),
      );

      setUsers(users);
    }

    if (loggedUser.type === 'Administrador') {
      loadUsers();
    }
  }, []);

  async function createUser(userInput: UserInput) {
    const user = {
      cpf: userInput.cpf,
      email_usuario: userInput.email,
      senha: userInput.password,
      nome_do_usuario: userInput.name,
      tipo: userInput.type,
      crm: userInput.crm,
      data_residencia: userInput.residencyDate,
      titulacao: userInput.title,
    };
    const response = await api.post('/usuario/create', user);
    setUsers([...users, response.data]);
  }

  async function removeUser(userId: string) {
    await api.delete(`/usuario/delete/${userId}`);

    const usersFiltered = users.filter((user) => user.id !== userId);

    setUsers(usersFiltered);
  }

  async function updateUser(userId: string, userInput: UserInput) {
    const user = {
      cpf: userInput.cpf,
      email_usuario: userInput.email,
      senha: userInput.password,
      nome_do_usuario: userInput.name,
      tipo: userInput.type,
      crm: userInput.crm,
      data_residencia: userInput.residencyDate,
      titulacao: userInput.title,
    };

    const updatedUser = await api.put(`/usuario/update/${userId}`, user);

    const updatedUsers = users.map((user) =>
      user.id !== updatedUser.data.id ? user : updatedUser.data,
    );

    setUsers(updatedUsers);
  }

  async function requestPasswordReset(email: string) {
    await api.post(`/session/forgot-password`, { email_usuario: email });
  }

  async function changePassword(password: string, passwordCheck: string, token:string, id:string) {
      await api.post(`/session/reset-password/${id}/${token}`, { password, passwordConfirmation: passwordCheck })
  }

  return (
    <UsersContext.Provider
      value={{ users, createUser, removeUser, updateUser, requestPasswordReset, changePassword }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  return useContext(UsersContext);
}
