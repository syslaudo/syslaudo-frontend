import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface User {
  id: number;
  cpf: string;
  email: string;
  password: string;
  name: string;
  type: string;
  crm?: string;
  date?: Date;
  title?: string;
}

type UserInput = Omit<User, "id">;

interface UsersContextData {
  users: User[];
  createUser: (userInput: UserInput) => Promise<void>;
  removeUser: (userId: string) => Promise<void>;
  updateUser: (userId: number, userInput: UserInput) => Promise<void>;
}

interface UsersProviderProps {
  children: ReactNode;
}

const UsersContext = createContext<UsersContextData>({} as UsersContextData);

export function UsersProvider({ children }: UsersProviderProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function loadUsers() {
      await api.get("/users").then((response) => setUsers(response.data));
    }

    loadUsers();
  }, []);

  async function createUser(userInput: UserInput) {
    const response = await api.post("/users", userInput);
    setUsers([...users, response.data]);
  }

  async function removeUser(userId: string) {
    await api.delete(`/users/${userId}`);

    const usersFiltered = users.filter((user) => user.id !== Number(userId));

    setUsers(usersFiltered);
  }

  async function updateUser(userId: number, userInput: UserInput) {
    const updatedUser = await api.put(`/users/${userId}`, {
      ...userInput,
      id: userId,
    });

    const updatedUsers = users.map((user) =>
      user.id !== updatedUser.data.id ? user : updatedUser.data
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
