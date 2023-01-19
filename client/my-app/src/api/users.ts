import axios from 'axios';
import { BASE_URL } from '../constants';

const usersBaseURL = BASE_URL + '/users';

export const getUsers = async(): Promise<User[]> => {
  const response = await axios.get(usersBaseURL);

  return response.data;
};

export const getUserById = async(userId: string): Promise<User> => {
  const response = await axios.get(`${usersBaseURL}/${userId}`)

  return response.data;
};

export const removeUser = async(userId: string): Promise<void> => {
  await axios.delete(`${usersBaseURL}/${userId}`);
};

export const addUser = async(name: string): Promise<User> => {
  const response = await axios.post(usersBaseURL, { name });

  return response.data;
};

export const patchUser = async(id: string, name: string): Promise<void> => {
  await axios.patch(`${usersBaseURL}/${id}`, { name });
};
