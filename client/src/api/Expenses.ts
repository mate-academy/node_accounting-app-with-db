import axios from 'axios';

type ReqBody = {
  userId: string,
  spentAt: string,
  title: string,
  amount: number,
  category: string,
  note: string,
}

export function getExpenses() {
  return axios.get('http://localhost:3001/expenses').then(res => res.data);
}

export function getExpense(id:string) {
  return axios.get(`http://localhost:3001/expenses/${id}`).then(res => res.data);
}

export function postExpense(body: ReqBody) {
  return axios.post('http://localhost:3001/expenses', body);
}

export function patchExpense(id: string, body: ReqBody) {
  return axios.patch(`http://localhost:3001/expenses/${id}`, body);
}

export function deleteExpense(id: string) {
  return axios.delete(`http://localhost:3001/expenses/${id}`);
}
