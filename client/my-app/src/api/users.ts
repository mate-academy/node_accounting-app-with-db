import axios from 'axios';
import { User } from '../types/User';

const BaseURL = 'http://localhost:5000/users';

export const getUsers = () => {
  return axios.get(BaseURL)
    .then(response => response.data);
};

export const getUserById = (userId: number) => {
  return axios.get(`${BaseURL}/${userId}`)
    .then(response => response.data);;
}

export const removeUser = async(userId: number) => {
  await axios.delete(`${BaseURL}/${userId}`);
};

export const addUser = (name: string): Promise<User> => {
  return axios.post(BaseURL, { name })
    .then(response => response.data)
    .catch(err => {
      throw new Error(err);
    });;
};

export const patchUser = async(id: number, name: string) => {
  await axios.patch(`${BaseURL}/${id}`, { name });
};
