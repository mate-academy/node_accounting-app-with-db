import axios from 'axios';
import { User } from '../types/User';

const BaseURL = 'http://localhost:5000/users';

export const getUsers = async() => {
  const data: User[] = await axios.get(BaseURL)
    .then(response => response.data);

  return data;
};

export const getUserById = async(userId: number) => {
  const data: User = await axios.get(`${BaseURL}/${userId}`)
    .then(response => response.data);

  return data;
}

export const removeUser = async(userId: number) => {
  await axios.delete(`${BaseURL}/${userId}`);
};

export const addUser = async (name: string): Promise<User> => {
  const data: User = await axios.post(BaseURL, { name })
    .then(response => response.data)
    .catch(err => {
      throw new Error(err);
    });

  return data;
};

export const patchUser = async(id: number, name: string) => {
  await axios.patch(`${BaseURL}/${id}`, { name });
};
