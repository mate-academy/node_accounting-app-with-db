import axios from 'axios';
import { BASE_URL } from '../constants';

const usersBaseURL = BASE_URL + '/users';

export const getUsers = async() => {
  try {
    const response = await axios.get(usersBaseURL);

    return response.data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getUserById = async(userId: number) => {
  try {
    const response = await axios.get(`${usersBaseURL}/${userId}`)

    return response.data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const removeUser = async(userId: number) => {
  try {
    await axios.delete(`${usersBaseURL}/${userId}`);
  } catch (err: any) {
    throw new Error(err);
  }
};

export const addUser = async(name: string): Promise<User> => {
  try {
    const response = await axios.post(usersBaseURL, { name });

    return response.data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const patchUser = async(id: number, name: string) => {
  try {
    await axios.patch(`${usersBaseURL}/${id}`, { name });
  } catch (err: any) {
    throw new Error(err);
  }
};
