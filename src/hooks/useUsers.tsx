import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';
import { isAdmin } from '../services/Auth';

interface User {
  id: string;
  cpf: string;
  email_usuario: string;
  senha?: string;
  nome_do_usuario: string;
  tipo: string;
  crm?: string;
  data_residencia?: string;
  titulacao?: string;
}

type UserInput = Omit<User, 'id'>;

interface UsersContextData {
  users: User[];
  createUser: (userInput: UserInput) => Promise<void>;
  removeUser: (userId: string) => Promise<void>;
  updateUser: (userId: string, userInput: UserInput) => Promise<void>;
}

interface UsersProviderProps {
  children: ReactNode;
}

const UsersContext = createContext<UsersContextData>({} as UsersContextData);

export function UsersProvider({ children }: UsersProviderProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function loadUsers() {
      await api
        .get('/usuario/listAll')
        .then((response) => setUsers(response.data));
    }

    if (isAdmin()) {
      loadUsers();
    }
  }, []);

  async function createUser(userInput: UserInput) {
    const response = await api.post('/usuario/create', userInput);
    setUsers([...users, response.data]);
  }

  async function removeUser(userId: string) {
    await api.delete(`/usuario/delete/${userId}`);

    const usersFiltered = users.filter((user) => user.id !== userId);

    setUsers(usersFiltered);
  }

  async function updateUser(userId: string, userInput: UserInput) {
    const updatedUser = await api.put(`/usuario/update/${userId}`, userInput);

    const updatedUsers = users.map((user) =>
      user.id !== updatedUser.data.id ? user : updatedUser.data,
    );

    setUsers(updatedUsers);
  }

  return (
    <UsersContext.Provider
      value={{ users, createUser, removeUser, updateUser }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  return useContext(UsersContext);
}
