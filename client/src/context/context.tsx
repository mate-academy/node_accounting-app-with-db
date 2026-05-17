import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import axios from "axios";
import { Expense } from "../types/Expense";

type UserContextType = {
  users: User[],
  deleteUser: (id: number) => {}
  createUser: (name: string) => {}
  updateUser: (id: number, name: string) => {}
  getUsers: () => {}
  expenses: Expense[]
  getExpenses: (userId: number | null) => {}
  user: User | null
  getUser: (userId: number | null) => {}
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [expenses,setExpenses] = useState<Expense[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const getUsers = async () =>{
    axios
    .get('http://localhost:8080/users')
    .then((result) => setUsers(result.data))
    .catch((err) => console.log(err))
    .finally(() => console.log('get users'))
  }

  const getUser = async (userId: number | null) => {
    axios
      .get(`http://localhost:8080/users/${userId}`)
      .then((result) => setUser(result.data))
      .catch((err) => console.log(err))
      .finally(() => console.log('get users'))
  }

  const deleteUser = async (id: number) =>{
    try {
      await axios.delete(`http://localhost:8080/users/${id}`)
      getUsers();
      // setMessage('Success! User was deleted')
      console.log('delete user')
    } catch (error) {
      console.log(error)
      // setMessage('Error! Something went wrong!')
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const createUser = async (name: string) => {
    axios
      .post('http://localhost:8080/users', {
        name
      })
      .then(result => {
        getUsers();
        console.log('create user', result)
      })
      .catch(err => console.log(err))
  }

  const updateUser = async (id: number, name: string) => {
    axios
    .patch(`http://localhost:8080/users/${id}`, {
      name
    })
    .then(result => {
      getUsers();
      console.log('create user', result)
    })
    .catch(err => console.log(err))
  }

  const getExpenses = async (userId: number | null) => {
    axios.get(`http://localhost:8080/expenses`, {
      params: {
        userId
      }
    })
    .then((result) => {
      setExpenses(result.data);
    })
    .catch((err) => console.log(err))
  }
  return (
    <UserContext.Provider value={{
      users,
      deleteUser,
      createUser,
      updateUser,
      getUsers,
      expenses,
      getExpenses,
      user,
      getUser
      }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
