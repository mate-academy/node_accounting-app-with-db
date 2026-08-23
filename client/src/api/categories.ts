import type { Category } from '../types/Category';
import axios from 'axios';

axios.defaults.baseURL = 'https://185.25.119.160'//'http://localhost:5700';

export function getAll(): Promise<Category[]> {
  return axios.get<Category[]>('/categories').then(response => response.data);
}

export async function getOne(id: string): Promise<Category> {
  const response = await axios.get(`/categories/${id}`);

  return response.data;
}

export async function add(name: string): Promise<Category> {
  const response = await axios.post('/categories', { name });

  return response.data;
}

export async function remove(id: number): Promise<string> {
  const response = await axios.delete(`/categories/${id}`);

  return response.statusText;
}

export async function update({
  id, name
}: Category): Promise<Category> {
  const response = await axios.patch(`/categories/${id}`, {
    name,
  });

  return response.data;
}
